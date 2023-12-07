import CButton from '@/components/CButton'
import dynamic from 'next/dynamic'
import React from 'react'
import { Group } from 'react-konva'
import DiceScratch from './DiceScratch'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext'
import { BingoBonanzaClass, MatchPrizeClass } from '@/hooks/methods'
import { afterScratchAuth, authentications } from '@/api/API'
import { useSearchParams } from 'next/navigation'
import { TDiceImageName } from './DiceImage'

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function DiceRush20() {
  const scratchCardRef = React.useRef<any>()
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const combination = React.useMemo(() => {
    const keyPrizes:TDiceImageName[] = ['5', '10',"20", '50', '100',"500", '1k', '2k', '20k', '200k'] 
    const match = new MatchPrizeClass<TDiceImageName>({
        combi: isCardScratch.combi, 
        keyPrizes,
      }, {column: 2, rows: 3}) 
      return match.get() 
  }, [isCardScratch.combi]);
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
         url_path="twentycards" 
         onfastscratch={onfastscratch} 
          onclickStart={handleButtonMain} /> 
          <DiceScratch
            ref={scratchCardRef}
            referenceno={isCardScratch.refno} 
            combination={combination} 
            scratchdone={onScratchDone}
          />
      {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default DiceRush20