import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva' 
import BurjkhalifaScratch from './BurjkhalifaScratch'

function Burjkhalifa() {
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
         url_path="hundredcards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} /> 
         <BurjkhalifaScratch ref={scratchCardRef}
            combination={[
              [false, false, false],
              [true, false, false],
              [false, false, false],
            ]}
          />
    </Group>
  )
}

export default Burjkhalifa