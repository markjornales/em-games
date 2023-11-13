import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BacaratScratch from './BacaratScratch'

function Bacarat() {
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
         url_path="fiftycards"  
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
         <BacaratScratch ref={scratchCardRef} combination={[
                [true, false, ],
                [false, false,],
                [false, true,],
                [false, false,],
            ]}/>
    </Group>
  )
}

export default Bacarat