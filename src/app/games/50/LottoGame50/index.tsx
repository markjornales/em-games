import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto50Scratch from './Lotto50Scratch'

function LottoGame50() {
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
         <CButton 
         label="NEXT CARD" 
         url_path="fiftycards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
          <Lotto50Scratch
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

export default LottoGame50