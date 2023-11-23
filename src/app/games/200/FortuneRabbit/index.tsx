import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import FortuneScratch from './FortuneScratch';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

const sampleData = [
  [false, false , false],
  [false, true , false],
  [false, false , true]
]; 

function FortuneRabbit() { 
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
        url_path="hundredto" 
        onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
        }} 
        onclickStart={handleButtonMain} />
        <FortuneScratch combination={sampleData} ref={scratchCardRef}/>
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default FortuneRabbit