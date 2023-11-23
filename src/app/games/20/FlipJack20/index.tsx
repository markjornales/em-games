import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import FlipJackScratch from './FlipJackSratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function FlipJack20() {
  const scratchCardRef = React.useRef<any>();
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
         url_path="twentycards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
          <FlipJackScratch ref={scratchCardRef} combination={[
            ["jack", undefined, "jack"],
            [undefined, undefined, undefined], 
          ]}/>
           {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default FlipJack20