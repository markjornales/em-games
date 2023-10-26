import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import Lotto100Scratch from './Lotto100Scratch'

function LottoGame100() {
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
          <Lotto100Scratch
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

export default LottoGame100