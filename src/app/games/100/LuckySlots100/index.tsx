import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import LuckySlotsScratch, { TCombinations } from './LuckySlotsScratch'
import React from "react";

const combinations:TCombinations[][] = [
    ["seven", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "dollar", "dollar"],
    ["dollar", "dollar", "seven", "dollar"],
]


function LuckySlots100() {

  const scratchCardRef = React.useRef<any>();

  const handleButtonMain = () => { 
    if(!scratchCardRef.current.isScratchDone) {
      alert('please Scratch first')
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
    </Group>
  )
}

export default LuckySlots100