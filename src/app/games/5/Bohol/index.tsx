// fivecards
import { authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import BoholScratch from './BoholScratch';
import { GridBooleansCards } from '@/hooks/functions';

function Bohol() {
    const scratchCardRef = React.useRef<any>();
    const { setPlayed } = React.useContext(CanvasContext);
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;
    
    const handleButtonMain = () => {
        if (!scratchCardRef.current.isScratchDone) {
            alert('please Scratch first')
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
            <BoholScratch 
                ref={scratchCardRef}
                reference={isCardScratch.refno}
                popupwinners={[0,1,2,3,4,5,7,9,12][isCardScratch.combi.replace(/[^1]/g, '').length]} 
                combination={new GridBooleansCards({ 
                columns: 3, 
                combi: isCardScratch.combi, 
                rows: 3 
            }).getValues()}/>
        </Group>
    )
}

export default Bohol