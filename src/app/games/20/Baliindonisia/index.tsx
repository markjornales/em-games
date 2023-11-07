import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BaliScratch from './BaliScratch'

function Baliindonisia() {
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
         <CButton label="NEXT CARD" url_path="twentycards" onclickStart={handleButtonMain}  /> 
         <BaliScratch ref={scratchCardRef} combination={[
                [false, false, ],
                [false, false, ],
                [false, false, ],
            ]}/>
    </Group>
  )
}

export default Baliindonisia