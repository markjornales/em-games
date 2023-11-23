import CButton from '@/components/CButton'
import { Group } from 'react-konva'
import React from "react";
import SpotcashScratch from './SpotcashScratch';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Spotcash() {

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
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
     </Group>
  )
}

export default Spotcash