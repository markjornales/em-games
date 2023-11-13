import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto20Scratch from './Lotto20Scratch'

function LottoGame20() {
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
         url_path="twentycards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} />
          <Lotto20Scratch
            ref={scratchCardRef}
           combinations={[
            [false, false , false, false, false],
            [false, false , true, false, false],
            [true, false , false, false, false],
            [false, false , false, false, false],
          ]}
          />
    </Group>
  )
}

export default LottoGame20