import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import DiceRollerScratch from './DiceRollerScratch'
import dynamic from 'next/dynamic';
import { DiceRollerClass, MatchPrizeClass } from '@/hooks/methods'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext'
import { useSearchParams } from 'next/navigation'
import { afterScratchAuth, authentications } from '@/api/API'
import { TDicename } from './DiceImage'


const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function DiceRoller50() {
  const scratchCardRef = React.useRef<any>()
  const { setPlayed } = React.useContext(CanvasContext);     
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combinations = React.useMemo(() => {
    const keyPrizes:TDicename[] = ["5", "10","20", "50", '100',"200", "500", "1k", "5k", "50k", "500k"] 
    const match = new MatchPrizeClass<TDicename>({
      combi: isCardScratch.combi, 
      keyPrizes,
    }, {column: 3, rows: 3})  
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
          <DiceRollerScratch
            ref={scratchCardRef} 
            reference={isCardScratch.refno}
            combinations={combinations}
            scratchdone={onScratchDone}
          />
          {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default DiceRoller50