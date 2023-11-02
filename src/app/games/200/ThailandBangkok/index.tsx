import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'  
import ThailandBScratch from './ThailandBScratch'

function ThailandBangkok() {
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
        <ThailandBScratch ref={scratchCardRef} combination={[
            [false, false , false],
            [false, false , false],
            [false, false , false],
        ]}/>
    </Group>
  );
}

export default ThailandBangkok