import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import LuckySlotsScratch, { TCombinations } from './LuckySlotsScratch'
import React from "react";
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

const combinations:TCombinations[][] = [
    ["seven", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "seven", "dollar"],
]


function LuckySlots100() {

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
        url_path="hundredcards" 
        onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
        onclickStart={handleButtonMain} />
        <LuckySlotsScratch ref={scratchCardRef} combinations={combinations}/>
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  )
}

export default LuckySlots100