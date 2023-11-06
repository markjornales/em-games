import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import BugsukScratch from './BugsukScratch';

function Busukpalawan() {
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
            <BugsukScratch ref={scratchCardRef} combination={[
                [true, false, false,],
                [false, false, false,],
                [false, false, false,], 
            ]}/>
        </Group>
    )
}

export default Busukpalawan