import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BingoScratch from './BingoScratch'
import dynamic from 'next/dynamic';
import { BingoBonanzaClass } from '@/hooks/methods';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { afterScratchAuth, authentications } from '@/api/API';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function Bingo() {
  const scratchCardRef = React.useRef<any>()
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const [is_reset, set_reset] = React.useState<boolean>(false);
  const combination = React.useMemo(() => {
    const bingobonanza = new BingoBonanzaClass({ cols: 2, rows: 3, combi: isCardScratch.combi});
    return bingobonanza.getValues();
  }, [isCardScratch.combi, is_reset]);
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
         url_path="fiftycards"  
         onfastscratch={onfastscratch} 
         onclickStart={handleButtonMain} /> 
         <BingoScratch 
          ref={scratchCardRef} 
          referenceno={isCardScratch.refno} 
          combination={combination} 
          scratchdone={onScratchDone}
         />
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default Bingo