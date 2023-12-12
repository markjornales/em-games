import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { MatchPrizeClass } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import BurjkhalifaScratch from './BurjkhalifaScratch';
import { TBurjname } from './Burjkhalifaasset';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Burjkhalifa() {
   const scratchCardRef = React.useRef<any>() 
   const { setPlayed } = React.useContext(CanvasContext);     
   const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
   const [isWarningShow, setWarningShow] = React.useState<boolean>(false);   
   const searchparams = useSearchParams(); 
   const search = searchparams.get("q")!;
   const gid = searchparams.get("gid")!;  
   const combination = React.useMemo(() => {
    const keyPrizes:TBurjname[] = ["20", "50", "100", "1k", "10k", "100k", "1m"]
    const match = new MatchPrizeClass<TBurjname>({
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
         onclickStart={handleButtonMain} /> 
         <BurjkhalifaScratch 
            ref={scratchCardRef} 
            reference={isCardScratch.refno} 
            combination={combination}
            scratchdone={onScratchDone}  
          />
          {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default Burjkhalifa