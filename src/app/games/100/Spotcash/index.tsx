import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import React from "react";
import SpotcashScratch from './SpotcashScratch';

function Spotcash() {

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
        url_path="hundredcards" 
        onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
        onclickStart={handleButtonMain} />
        <SpotcashScratch ref={scratchCardRef} combination={[
                [false, false, false],
                [false, false, false],
                [false, false, false],
            ]}/>
     </Group>
  )
}

export default Spotcash