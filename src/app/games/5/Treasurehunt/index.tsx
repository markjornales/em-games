// fivecards// fivecards
import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import TreasureScratch from './TreasureScratch';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Treasurehunt() {
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
            <TreasureScratch ref={scratchCardRef} combination={[
                [true, false, false ],
                [false, true, false ],
                [false, false, true ],
            ]}/>

{isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
        </Group>
    )
}

export default Treasurehunt