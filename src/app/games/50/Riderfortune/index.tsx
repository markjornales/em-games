import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import RidersScratch from './RidersScratch'

function Riderfortune() {
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
         <RidersScratch ref={scratchCardRef} combination={[
                [true, false, false ],
                [false, true, false ],
                [false, false, false ],
            ]}/>
    </Group>
  )
}

export default Riderfortune