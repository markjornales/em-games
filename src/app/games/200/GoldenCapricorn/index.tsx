import CButton from '@/components/CButton';
import React from 'react';
import { Group } from 'react-konva';
import GoldenCSCratch from './GoldenCScratch';

function GoldenCapricorn() {
   const scratchCardRef = React.useRef<any>()
  
  const handleButtonMain = () => {
    if(!scratchCardRef.current.isScratchDone) {
        alert('please Scratch first')
      } else {
        scratchCardRef.current.reset() 
      }  
  }
  
  return (
    <Group>
      <CButton label="NEXT CARD" onclickStart={handleButtonMain} />
        <GoldenCSCratch ref={scratchCardRef}/>
    </Group>
  )
}

export default GoldenCapricorn