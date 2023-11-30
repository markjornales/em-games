import CButton from '@/components/CButton'
import dynamic from 'next/dynamic'
import React from 'react'
import { Group } from 'react-konva'
import DiceScratch from './DiceScratch'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext'
import { BingoBonanzaClass } from '@/hooks/methods'
import { afterScratchAuth, authentications } from '@/api/API'
import { useSearchParams } from 'next/navigation'

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
    const prizeLegend = [ 
      {0: 3, 1: 0, 2:0, 3:0, 4:0, 5:0},
      {0: 0, 1: 3, 2:0, 3:0, 4:0, 5:0},
      {0: 0, 1: 0, 2:3, 3:0, 4:0, 5:0},
      {0: 0, 1: 0, 2:0, 3:3, 4:0, 5:0},
      {0: 0, 1: 0, 2:0, 3:0, 4:3, 5:0},
      {0: 0, 1: 0, 2:0, 3:0, 4:0, 5:3},
      {0: 1, 1: 1, 2:1, 3:0, 4:0, 5:0},
      {0: 0, 1: 0, 2:0, 3:1, 4:1, 5:1},
    ];
    const bingobonanza = new BingoBonanzaClass({
      combi: isCardScratch.combi, 
      cols: 2, 
      rows: 3,
      prizeLegend
    });
    return bingobonanza.getValues();
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