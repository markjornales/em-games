import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto20Scratch from './Lotto20Scratch'
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function LottoGame20() {
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);  

  const handleButtonMain = () => { 
    setWarningShow(false);
    if(!scratchCardRef.current.isScratchDone) {
      setWarningShow(true)
    } else {
      scratchCardRef.current.reset() 
    } 
  }
  return (
    <Group>
         <CButton 
         label="NEXT CARD" 
         url_path="twentycards" 
         onfastscratch={() =>{
          if(!scratchCardRef.current.isScratchDone){
              scratchCardRef.current.fastscratch();   
          } 
      }} 
         onclickStart={handleButtonMain} />
          <Lotto20Scratch
            ref={scratchCardRef}
           combinations={[
            [false, false , false, false, false],
            [false, false , true, false, false],
            [true, false , false, false, false],
            [false, false , false, false, false],
          ]}
          />

{isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default LottoGame20