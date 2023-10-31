import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import FruitBlastScratch from './FruitBlastScratch'

function FruitBlast100() {
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
         <CButton label="NEXT CARD" url_path="hundredcards" onclickStart={handleButtonMain} /> 
          <FruitBlastScratch
            ref={scratchCardRef}
            combinations={[
              [undefined, undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined], 
              ["cherry", undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined]
            ]}
          />
    </Group>
  )
}

export default FruitBlast100