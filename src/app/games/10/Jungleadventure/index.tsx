import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import JungleadventureScratch from './JungleadventureScratch';

function Jungleadventure() {
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
            <JungleadventureScratch ref={scratchCardRef} combination={[
                [true, false],
                [false, false],
                [false, false],
            ]}/>
        </Group>
    )
}

export default Jungleadventure