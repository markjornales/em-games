import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import CasinoJokerScratch from './CasinoJokerScratch'
import dynamic from 'next/dynamic';
// eto
const WarningModal = dynamic(() => import("@/components/WarningModal"));


function CasinoJoker() {
    const scratchCardRef = React.useRef<any>();
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);
  
    const handleButtonMain = () => {
        // eto
        setWarningShow(false);
        if(!scratchCardRef.current.isScratchDone) {
            // eto
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
            onclickStart={handleButtonMain} 
        />
        <CasinoJokerScratch ref={scratchCardRef} combination={[
            [false, false],
            [false, false], 
            [false, false], 
        ]}/>
        {/* eto */}
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
    </Group>
  );
}

export default CasinoJoker