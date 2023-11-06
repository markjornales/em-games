import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import SuperBallScratch from './SuperBallScratch';

function Superball() {
    const scratchCardRef = React.useRef<any>();

    const handleButtonMain = () => {
        if (!scratchCardRef.current.isScratchDone) {
            alert('please Scratch first')
        } else {
            scratchCardRef.current.reset()
        }
    }

    return (
        <Group>
            <CButton label="NEXT CARD" url_path="tencards" onclickStart={handleButtonMain} /> 
            <SuperBallScratch ref={scratchCardRef} combination={[undefined, undefined, undefined]}/>
        </Group>
    )
}

export default Superball