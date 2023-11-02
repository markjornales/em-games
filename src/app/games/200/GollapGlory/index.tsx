import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import GollapScratch from './GollapScratch'
const sampleData = [
    [false, false , false],
    [false, false, false],
    [false, false, false]
];

function GollapGlory() {
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
        <GollapScratch ref={scratchCardRef} combination={sampleData}/>
    </Group>
  );
}

export default GollapGlory