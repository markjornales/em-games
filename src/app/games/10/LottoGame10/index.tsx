import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto10Scratch from './Lotto10Scratch'

function LottoGame10() {
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
         <CButton label="NEXT CARD"  onclickStart={handleButtonMain} /> 
          <Lotto10Scratch
            ref={scratchCardRef}
            combinations={[
              [false, false , false, false, false],
              [false, true , false, false, false],
              [false, false , false, false, false],
              [false, false , true, false, false],
            ]}
          />
    </Group>
  )
}

export default LottoGame10