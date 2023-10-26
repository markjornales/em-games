import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import DiceScratch from './DiceScratch'

function DiceRush20() {
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
         <CButton label="NEXT CARD"  onclickStart={handleButtonMain}  /> 
          <DiceScratch
            ref={scratchCardRef}
            combination={[
              [3, null],
              [null, null],
              [3, null],
            ]}
          />

    </Group>
  )
}

export default DiceRush20