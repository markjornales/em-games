import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import FortuneScratch from './FortuneScratch';

const sampleData = [
  [false, false , false],
  [false, true , false],
  [false, false , true]
]; 

function FortuneRabbit() { 
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
        <CButton label="NEXT CARD" onclickStart={handleButtonMain} />
        <FortuneScratch combination={sampleData} ref={scratchCardRef}/>
    </Group>
  )
}

export default FortuneRabbit