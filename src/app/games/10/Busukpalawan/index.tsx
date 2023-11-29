import CButton from '@/components/CButton'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation';  
import React from 'react'
import { Group } from 'react-konva'
import BugsukScratch from './BugsukScratch';
import dynamic from 'next/dynamic';
import { afterScratchAuth, authentications } from '@/api/API';


const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Busukpalawan() {
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
            url_path="tencards" 
            onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();   
                } 
            }} 
            onclickStart={handleButtonMain} />
            <BugsukScratch ref={scratchCardRef} 
            reference={isCardScratch.refno}
            popupwinners={[0,1,2,4,5,7,8,10,13][isCardScratch.combi.replace(/[^1]/g, '').length]}  
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

export default Busukpalawan