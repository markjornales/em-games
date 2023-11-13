import CButton from '@/components/CButton'
import { Group } from 'react-konva' 
import BingoScratch from './BingoScratch';
import React from "react";


function BingoGame() {
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
         <CButton onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();   
                } 
            }}  label="NEXT CARD" url_path="hundredto"  onclickStart={handleButtonMain} />
         <BingoScratch ref={scratchCardRef}/>
     </Group>
  );
}

export default BingoGame