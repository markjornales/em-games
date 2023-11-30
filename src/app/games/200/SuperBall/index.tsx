import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import SuperBallScratch from './SuperBallScratch';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function SuperBall() {
    const scratchCardRef = React.useRef<any>()
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  
    const combination = isCardScratch.combi.replace(/[^1]/g, "").length

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

  const onfastscratch = () => {
    if(!scratchCardRef.current.isScratchDone){
     scratchCardRef.current.fastscratch();   
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
          url_path="hundredto" 
          onclickStart={handleButtonMain}
          onfastscratch={onfastscratch} 
        />
        <SuperBallScratch 
          ref={scratchCardRef}
          referenceno={isCardScratch.refno} 
          combination={combination} 
          scratchdone={onScratchDone}
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  );
}
 
export default SuperBall