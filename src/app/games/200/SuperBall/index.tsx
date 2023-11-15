import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import SuperBallScratch from './SuperBallScratch'

function SuperBall() {
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
        <CButton onfastscratch={() => {}} label="NEXT CARD" url_path="hundredto" onclickStart={handleButtonMain} />
        <SuperBallScratch ref={scratchCardRef} combination={[undefined, 1, undefined]}/>
    </Group>
  );
}

export default SuperBall