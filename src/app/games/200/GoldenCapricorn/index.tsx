import CButton from '@/components/CButton';
import React from 'react';
import { Group } from 'react-konva';
import GoldenCSCratch from './GoldenCScratch';
import dynamic from 'next/dynamic';
import { GridBooleansCards } from '@/hooks/methods';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { afterScratchAuth, authentications } from '@/api/API';
import { useSearchParams } from 'next/navigation';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function GoldenCapricorn() {
   const scratchCardRef = React.useRef<any>()
   const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
   const { setPlayed } = React.useContext(CanvasContext);
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!; 
    const [is_reset, set_reset] = React.useState<boolean>(false);
    const combinations = React.useMemo(() => new GridBooleansCards({ 
      rows: 3,
      columns: 3, 
      combi: isCardScratch.combi, 
    }).getValues(), 
    [isCardScratch.combi, is_reset]);

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
          set_reset((e) => !e) 
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
      <GoldenCSCratch 
        ref={scratchCardRef}
        combination={combinations}
        reference={isCardScratch.refno}
        scratchdone={onScratchDone} 
      />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default GoldenCapricorn