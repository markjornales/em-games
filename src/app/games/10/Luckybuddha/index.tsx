import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { MatchPrizeClass } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import { TCoinname } from './Dollar';
import LuckybuddhaScratch from './LuckybuddhaScratch';

const WarningModal = dynamic(() => import("@/components/WarningModal"));


function Luckybuddah() {
    const scratchCardRef = React.useRef<any>()
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);   
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  
    const combination = React.useMemo(() => {
      const keyPrizes:TCoinname[] = ['5', '10', '50', '100', '500', '1k', '10k', '100k'] 
        const match = new MatchPrizeClass<TCoinname>({
            combi: isCardScratch.combi, 
            keyPrizes,
        }) 
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
            url_path="tencards" 
            onfastscratch={onfastscratch} 
            onclickStart={handleButtonMain}/>
            <LuckybuddhaScratch ref={scratchCardRef}
               reference={isCardScratch.refno}  
               combination={combination}
               scratchdone={onScratchDone}
            />
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
        </Group>
    )
}

export default Luckybuddah