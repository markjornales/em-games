import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { GridBooleansCards } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import FortuneScratch from './FortuneScratch';

const WarningModal = dynamic(() => import("@/components/WarningModal"));
function FortuneRabbit() { 
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const { setPlayed } = React.useContext(CanvasContext);
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combinations = React.useMemo(() => 
    new GridBooleansCards({ columns: 3, combi: isCardScratch.combi, rows: 3})
    .getValues(), [isCardScratch.combi]);

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
  
  //declare
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
        onclickStart={handleButtonMain} />
        <FortuneScratch 
          ref={scratchCardRef}
          combination={combinations} 
          scratchdone={onScratchDone} //declare 
          reference={isCardScratch.refno}
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default FortuneRabbit