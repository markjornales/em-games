import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import DiceRollerScratch from './DiceRollerScratch'

function DiceRoller50() {
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
         <CButton label="NEXT CARD" url_path="fiftycards"  onclickStart={handleButtonMain} /> 
          <DiceRollerScratch
            ref={scratchCardRef}
            combinations={[
              [undefined , undefined, undefined],
              [undefined, undefined, undefined],
              [undefined, undefined, undefined]
            ]}
          />
    </Group>
  )
}

export default DiceRoller50