import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import MangoScratch from './MangoScratch'

function Mangobonanza() {
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
         <CButton 
         label="NEXT CARD" 
         url_path="twentycards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain}  /> 
          <MangoScratch ref={scratchCardRef} combination={[
                [false, false, false],
                [false, true, true],
                [false, false, false],
              
            ]}/>
    </Group>
  )
}

export default Mangobonanza