import CButton from '@/components/CButton'
import { Group } from 'react-konva'
 import React from "react";
import PockerScratch from './PockerScratch';
 

function Pocker() {

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
        <PockerScratch ref={scratchCardRef} combination={[
            [undefined, undefined],
            [undefined, undefined],
            [undefined, undefined],
          ]}/>
     </Group>
  )
}

export default Pocker