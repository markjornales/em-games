import CButton from '@/components/CButton'
import { Group } from 'react-konva'
 import React from "react";
import RouletteScratch from './RouletteScratch';
 

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
        <RouletteScratch ref={scratchCardRef}
          combination={[
            [false, false, false],
            [false, false, false],
            [false, false, false],
          ]}
        />
     </Group>
  )
}

export default Roulette