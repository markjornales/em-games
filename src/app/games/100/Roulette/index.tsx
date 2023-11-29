import CButton from '@/components/CButton'
import { Group } from 'react-konva'
 import React from "react";
import RouletteScratch from './RouletteScratch';
import dynamic from 'next/dynamic';
import { afterScratchAuth, authentications } from '@/api/API';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/functions';         
import { useSearchParams } from 'next/navigation';  

const WarningModal = dynamic(() => import("@/components/WarningModal"));
 

function Roulette() {

  const scratchCardRef = React.useRef<any>();
  const { setPlayed } = React.useContext(CanvasContext);     
   const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);   
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const searchparams = useSearchParams(); 
   const search = searchparams.get("q")!;
   const gid = searchparams.get("gid")!; 

  const handleButtonMain = () => { 
    setWarningShow(false); 
    if(!scratchCardRef.current.isScratchDone) {
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
        url_path="hundredcards" 
        onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
        onclickStart={handleButtonMain} />
        <RouletteScratch ref={scratchCardRef}
          reference={isCardScratch.refno}
        
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

export default Roulette