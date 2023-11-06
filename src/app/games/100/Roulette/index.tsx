import CButton from '@/components/CButton'
import { Group } from 'react-konva'
 import React from "react";
 

function Roulette() {

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
        <CButton label="NEXT CARD" url_path="hundredcards" onclickStart={handleButtonMain} />
     </Group>
  )
}

export default Roulette