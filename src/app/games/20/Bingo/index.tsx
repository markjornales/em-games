import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BingoScratch from './BingoScratch'

function Bingo() {
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
         <BingoScratch ref={scratchCardRef} combination={[
                [false, false, false],
                [false, true, true],
              
            ]}/>
    </Group>
  )
}

export default Bingo