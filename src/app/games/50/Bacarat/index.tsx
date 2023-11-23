import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BacaratScratch from './BacaratScratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Bacarat() {
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
         <BacaratScratch ref={scratchCardRef} combination={[
                [true, false, ],
                [false, false,],
                [false, true,],
                [false, false,],
            ]}/>
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default Bacarat