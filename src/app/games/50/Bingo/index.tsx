import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BingoScratch from './BingoScratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function Bingo() {
  const scratchCardRef = React.useRef<any>()
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);  
  
  const handleButtonMain = () => {
    setWarningShow(false);
    if(!scratchCardRef.current.isScratchDone) {
      setWarningShow(true) 
      } else {
        scratchCardRef.current.reset() 
      }  
  }
  return (
    <Group>
         <CButton 
         label="NEXT CARD" 
         url_path="fiftycards"  
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
         <BingoScratch ref={scratchCardRef} combination={[
                [false, false],
                [false, true],
                [false, true],
              
            ]}/>
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default Bingo