import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import SpotScratch from './SpotScratch'

function Spotcash() {
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
         <SpotScratch ref={scratchCardRef} combination={[
                [false, false, false ],
                [false, true, false ],
                [false, false, false ],
            ]}/>
    </Group>
  )
}

export default Spotcash