import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'

function Stakessteeds() {
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
    </Group>
  )
}

export default Stakessteeds