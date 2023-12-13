import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import UsaScratch from './UsaScratch'
import dynamic from 'next/dynamic';
import { afterScratchAuth, authentications } from '@/api/API';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation'; 

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function USA() {
  const scratchCardRef = React.useRef<any>()
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider); 
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const [is_reset, set_reset] = React.useState<boolean>(false);
  const combinations = React.useMemo(() => { 
     return new GridBooleansCards({ columns: 4, combi: isCardScratch.combi, rows: 3}).getValues();
    }, [isCardScratch.combi, is_reset]);

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
          set_reset((e) => !e) 
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
         <UsaScratch  
            ref={scratchCardRef} 
            reference={isCardScratch.refno}
            combination={combinations}
            scratchdone={onScratchDone}
          />
          {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default USA