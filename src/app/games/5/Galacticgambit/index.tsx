// fivecards// fivecards
import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton'

import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/functions';         
import { useSearchParams } from 'next/navigation';   

import React from 'react'
import { Group } from 'react-konva'
import GalacticScratch from './GalacticScratch';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Galacticgambit() {
    const scratchCardRef = React.useRef<any>();
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!; 

    const handleButtonMain = () => {
        setWarningShow(false);
        if (!scratchCardRef.current.isScratchDone) {
            setWarningShow(true)
        } else {
            authentications({ 
                setAuthenticated, 
                setCardScratch, 
                setPlayed, 
                searchparams, 
                search, 
                gid 
            })
            .then(() => {
                scratchCardRef.current.reset();
            });
        }
    }

    const onScratchDone = (done: boolean) => {
        if(done) {
          afterScratchAuth({ 
            gid,
            search, 
            searchparams, 
            setAuthenticated, 
            setCardScratch, 
            setPlayed, 
          });
        }
      }

    return (
        <Group>
            <CButton 
            label="NEXT CARD" 
            url_path="fivecards" 
            onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();   
                } 
            }}
            onclickStart={handleButtonMain} />
            <GalacticScratch 
                ref={scratchCardRef} 
                reference={isCardScratch.refno}
                popupwinners={[0,1,2,3,4,5,7,9,12][isCardScratch.combi.replace(/[^1]/g, '').length]}  
                combination={new GridBooleansCards({ 
                    columns: 3, 
                    combi: isCardScratch.combi, 
                    rows: 3 
                }).getValues()}
                scratchdone={onScratchDone}
            />
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
        </Group>
    )
}

export default Galacticgambit