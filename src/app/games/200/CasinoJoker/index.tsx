import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import CasinoJokerScratch from './CasinoJokerScratch'

function CasinoJoker() {
    const scratchCardRef = React.useRef<any>()
  
    const handleButtonMain = () => {
        if(!scratchCardRef.current.isScratchDone) {
            alert('please Scratch first')
        } else {
            scratchCardRef.current.reset() 
        }  
    }

  return (
    <Group>
        <CButton label="NEXT CARD" url_path="hundredto" onclickStart={handleButtonMain} />
        <CasinoJokerScratch ref={scratchCardRef} combination={[
            [false, false],
            [false, false], 
            [false, false], 
        ]}/>
    </Group>
  );
}

export default CasinoJoker