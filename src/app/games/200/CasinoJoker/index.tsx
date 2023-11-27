import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import CasinoJokerScratch from './CasinoJokerScratch'
import dynamic from 'next/dynamic';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { authentications } from '@/api/API';
import { useSearchParams } from 'next/navigation';
import { GridBooleansCards } from '@/hooks/functions';

const WarningModal = dynamic(() => import("@/components/WarningModal")); // eto


function CasinoJoker() {
    const scratchCardRef = React.useRef<any>();
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);    // eto
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  

    const handleButtonMain = () => { 
        setWarningShow(false); // eto
        if(!scratchCardRef.current.isScratchDone) { 
            setWarningShow(true) // eto
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
            url_path="hundredto" 
            onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();   
                } 
            }} 
            onclickStart={handleButtonMain} 
        />
        <CasinoJokerScratch 
            ref={scratchCardRef} 
            combination={new GridBooleansCards({ columns: 3, combi: isCardScratch.combi, rows: 2 }).getValues()}
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  );
}

export default CasinoJoker