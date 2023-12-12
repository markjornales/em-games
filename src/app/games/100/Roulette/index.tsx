import CButton from '@/components/CButton'
import { Group } from 'react-konva'
 import React from "react";
import RouletteScratch from './RouletteScratch';
import dynamic from 'next/dynamic';
import { afterScratchAuth, authentications } from '@/api/API';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards, MatchPrizeClass } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation';  
import { TRouletteName } from './Roulette';

const WarningModal = dynamic(() => import("@/components/WarningModal"));
 

function Roulette() {

  const scratchCardRef = React.useRef<any>();
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);   
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combination = React.useMemo(() =>{
    const keyPrizes:TRouletteName[] = ["20", "50", "100", "1k", "10k", "100k", "1m"]
    const match = new MatchPrizeClass<TRouletteName>({
      combi: isCardScratch.combi, 
      keyPrizes,
    }, {column: 3, rows: 3})  
    return match.get() 
  },
  [isCardScratch.combi]);

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
          url_path="hundredcards" 
          onfastscratch={onfastscratch} 
          onclickStart={handleButtonMain} 
        />
        <RouletteScratch 
          ref={scratchCardRef}
          reference={isCardScratch.refno} 
          combination={combination}
          scratchdone={onScratchDone}
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
     </Group>
  )
}

export default Roulette