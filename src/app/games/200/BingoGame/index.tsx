import CButton from '@/components/CButton'
import { Group } from 'react-konva' 
import BingoScratch from './BingoScratch';
import React from "react";
import dynamic from 'next/dynamic';
import { BingoScratchClass } from '@/hooks/functions';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { afterScratchAuth, authentications } from '@/api/API'; 

const WarningModal = dynamic(() => import("@/components/WarningModal"));
function BingoGame() {
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const { setPlayed } = React.useContext(CanvasContext);
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combinations = new BingoScratchClass({combi: isCardScratch.combi}).getValue()

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
          onfastscratch={onfastscratch} 
          onclickStart={handleButtonMain}
        />
        <BingoScratch 
          reference={isCardScratch.refno}
          ref={scratchCardRef} 
          combination={combinations}
          scratchdone={onScratchDone} 
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
     </Group>
  );
}

 

export default BingoGame