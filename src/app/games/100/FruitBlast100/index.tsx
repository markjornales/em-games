import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import FruitBlastScratch from './FruitBlastScratch'
import dynamic from 'next/dynamic';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { FruitBlashClass } from '@/hooks/methods';
import { afterScratchAuth, authentications } from '@/api/API';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function FruitBlast100() {
  const scratchCardRef = React.useRef<any>() 
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);   
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const [is_reset, set_reset] = React.useState<boolean>(false);
  const combination = React.useMemo(() => new FruitBlashClass({  
     combi: isCardScratch.combi,  
 }).getValue(),
 [isCardScratch.combi, is_reset]);


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
          onclickStart={handleButtonMain} 
         /> 
          <FruitBlastScratch
            ref={scratchCardRef} 
            combinations={combination}
            reference={isCardScratch.refno} 
            scratchdone={onScratchDone} 
          />
           {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default FruitBlast100