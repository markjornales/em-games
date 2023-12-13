import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import CasinoJokerScratch from './CasinoJokerScratch'
import dynamic from 'next/dynamic';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { afterScratchAuth, authentications } from '@/api/API';
import { useSearchParams } from 'next/navigation';
import { GridBooleansCards, MatchPrizeClass } from '@/hooks/methods';
import { TCasinoName } from './Joker';

const WarningModal = dynamic(() => import("@/components/WarningModal")); // eto


function CasinoJoker() {
    const scratchCardRef = React.useRef<any>();
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);    // eto
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  
    const [is_reset, set_reset] = React.useState<boolean>(false);
    const combinations = React.useMemo(() =>{
      const keyPrizes:TCasinoName[] = ["50", "100", "200","500", "1k", "2k", "20k", "200k", "2m"]
      const match = new MatchPrizeClass<TCasinoName>({
        combi: isCardScratch.combi, 
        keyPrizes,
      }, {column: 2, rows: 3})  
      return match.get() 
    },[isCardScratch.combi, is_reset]);
  

    const handleButtonMain = () => { 
        setWarningShow(false); // eto
        if(!scratchCardRef.current.isScratchDone) { 
            setWarningShow(true) // eto
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
            url_path="hundredto" 
            onfastscratch={onfastscratch} 
            onclickStart={handleButtonMain} 
        />
        <CasinoJokerScratch 
            ref={scratchCardRef} 
            combination={combinations}
            reference={isCardScratch.refno}
            scratchdone={onScratchDone} 
        />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  );
}

export default CasinoJoker