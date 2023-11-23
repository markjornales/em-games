// fivecards
import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BoholScratch from './BoholScratch';
import dynamic from 'next/dynamic';
const WarningModal = dynamic(() => import("@/components/WarningModal"));


function Bohol() {
    const scratchCardRef = React.useRef<any>();
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);

    const handleButtonMain = () => {
        setWarningShow(false);
        if (!scratchCardRef.current.isScratchDone) {
            setWarningShow(true)
        } else {
            scratchCardRef.current.reset()
        }
    }

    return (
        <Group>
            <CButton 
            label="NEXT CARD" 
            url_path="fivecards"
            onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();   
                } 
            }}  
            onclickStart={handleButtonMain} />
            <BoholScratch ref={scratchCardRef} combination={[
                [true, false],
                [false, false],
                [false, false], 
            ]}/>
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
        </Group>
    )
}

export default Bohol