import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import HorseScratch from './HorseScratch'

function Horses() {
    const scratchCardRef = React.useRef<any>()

    const handleButtonMain = () => {
        if (!scratchCardRef.current.isScratchDone) {
            alert('please Scratch first')
        } else {
            scratchCardRef.current.reset()
        }
    }

    return (
        <Group>
            <CButton label="NEXT CARD" url_path="hundredcards" onclickStart={handleButtonMain} />
            <HorseScratch ref={scratchCardRef}
                combination={[
                    [false, false, false],
                    [false, true, false],
                    [false, false, false]
                ]}
            />
        </Group>
    )
}

export default Horses