import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import Lotto100Scratch from './Lotto100Scratch'
import dynamic from 'next/dynamic';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { GridBooleansCards } from '@/hooks/methods';
import { afterScratchAuth, authentications } from '@/api/API'; 
const WarningModal = dynamic(() => import("@/components/WarningModal")); 
function LottoGame100() {
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);  
  const { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider); 
  const { setPlayed } = React.useContext(CanvasContext); 
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combinations = React.useMemo(() => 
      new GridBooleansCards({ rows: 5, columns: 4, combi: isCardScratch.combi, })
      .getValues(), 
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
          <Lotto100Scratch
            ref={scratchCardRef}
            combinations={combinations}
            reference={isCardScratch.refno}
            scratchdone={onScratchDone} 
          />
          {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default LottoGame100