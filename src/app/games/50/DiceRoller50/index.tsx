import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import DiceRollerScratch from './DiceRollerScratch'
import dynamic from 'next/dynamic';
import { DiceRollerClass } from '@/hooks/methods'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext'
import { useSearchParams } from 'next/navigation'
import { afterScratchAuth, authentications } from '@/api/API'


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
    const diceroller = new DiceRollerClass({combi: isCardScratch.combi});
    return diceroller.getValues();
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