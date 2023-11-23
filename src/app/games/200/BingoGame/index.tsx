import CButton from '@/components/CButton'
import { Group } from 'react-konva' 
import BingoScratch from './BingoScratch';
import React from "react";
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));


function BingoGame() {
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 

  const handleButtonMain = () => { 
    setWarningShow(false);
    if(!scratchCardRef.current.isScratchDone) {
      setWarningShow(true)
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
         {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
     </Group>
  );
}

export default BingoGame