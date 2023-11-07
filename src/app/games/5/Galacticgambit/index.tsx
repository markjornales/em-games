// fivecards// fivecards
import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import GalacticScratch from './GalacticScratch';

function Galacticgambit() {
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
            <CButton label="NEXT CARD" url_path="fivecards" onclickStart={handleButtonMain} />
            <GalacticScratch ref={scratchCardRef} combination={[
                [true, false, true],
                [false, false, false],
                [false, false, false], 
            ]}/>
        </Group>
    )
}

export default Galacticgambit