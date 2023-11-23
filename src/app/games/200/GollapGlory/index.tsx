import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import GollapScratch from './GollapScratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 
const sampleData = [
    [false, false , false],
    [false, false, false],
    [false, false, false]
];

function GollapGlory() {
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
        <CButton 
        label="NEXT CARD" 
        url_path="hundredto" 
        onfastscratch={() =>{
            if(!scratchCardRef.current.isScratchDone){
                scratchCardRef.current.fastscratch();   
            } 
        }} 
        onclickStart={handleButtonMain} />
        <GollapScratch ref={scratchCardRef} combination={sampleData}/>
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  );
}

export default GollapGlory