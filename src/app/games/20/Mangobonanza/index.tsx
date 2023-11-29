import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import MangoScratch from './MangoScratch'
import dynamic from 'next/dynamic';
// -- eto siya dapat ilagay
import { afterScratchAuth, authentications } from '@/api/API';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation';  
//------/>

const WarningModal = dynamic(() => import("@/components/WarningModal"));
function Mangobonanza() {
  const scratchCardRef = React.useRef<any>()

   // -- eto siya dapat ilagay
   const { setPlayed } = React.useContext(CanvasContext);     
   const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
  // --- />

  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);

   // -- eto siya dapat ilagay
   const searchparams = useSearchParams(); 
   const search = searchparams.get("q")!;
   const gid = searchparams.get("gid")!; 
   // -- />
  
  const handleButtonMain = () => {
    setWarningShow(false);
    if(!scratchCardRef.current.isScratchDone) {
      setWarningShow(true)
      } else {
        // --- eto siya dapat ilagay
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
      //-- 
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
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain}  /> 
          <MangoScratch ref={scratchCardRef} 
           //eto siya dapat ilagay
           reference={isCardScratch.refno}
        
           combination={new GridBooleansCards({ 
               columns: 3, 
               combi: isCardScratch.combi, 
               rows: 3 
           }).getValues()}
           // -----
           scratchdone={onScratchDone}
            />

{isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default Mangobonanza