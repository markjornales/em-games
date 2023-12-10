import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { GridBooleansCards, MatchPrizeClass } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import RidersScratch from './RidersScratch';
import { TRadirNameProp } from './Riders';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Riderfortune() {
  const scratchCardRef = React.useRef<any>()
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider); 
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const combinations = React.useMemo(() => {
    const keyPrizes:TRadirNameProp[] = ["5", "10","20", "50", '100',"200", "500", "1k", "5k", "50k", "500k"] 
    const match = new MatchPrizeClass<TRadirNameProp>({combi: isCardScratch.combi, keyPrizes,}, {column: 3, rows: 4})  
      return match.get() 
    },[isCardScratch.combi]);

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

  const handleFastScratch = () =>{
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
            onfastscratch={handleFastScratch} 
            onclickStart={handleButtonMain}
          /> 
         <RidersScratch 
            ref={scratchCardRef} 
            reference={isCardScratch.refno}
            combination={combinations}
            scratchdone={onScratchDone}
          />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default Riderfortune