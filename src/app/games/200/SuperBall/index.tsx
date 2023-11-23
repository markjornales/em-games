import CButton from '@/components/CButton'
// import WarningModal from '@/components/WarningModal'
import React from 'react'
import { Group } from 'react-konva'
import SuperBallScratch from './SuperBallScratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

function SuperBall() {
    const scratchCardRef = React.useRef<any>()
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
        <CButton  onfastscratch={() => {
           if(!scratchCardRef.current.isScratchDone){
            scratchCardRef.current.fastscratch();   
          } 
        }} label="NEXT CARD" url_path="hundredto" onclickStart={handleButtonMain} />
        <SuperBallScratch ref={scratchCardRef} combination={[undefined, 1, undefined]}/>
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  );
}

export default SuperBall