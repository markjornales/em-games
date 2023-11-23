import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import FruitBlastScratch from './FruitBlastScratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function FruitBlast100() {
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
         url_path="hundredcards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
          <FruitBlastScratch
            ref={scratchCardRef}
            combinations={[
              [undefined, undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined], 
              ["cherry", undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined]
            ]}
          />
           {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default FruitBlast100