import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function FortuneRabbit() {
    const [isScratch, setScratch] = React.useState<boolean>(false);
  const scratchCardRef = React.useRef<any>();

    const handleButtonMain = () => {
        // if(isScratch) {
        //   if(!scratchCardRef.current.isScratchDone) {
        //     alert('please Scratch first')
        //   } else {
        //     scratchCardRef.current.reset() 
        //   }
        //   return;
        // }
        // setScratch(true);
        
    }

  return (
    <Group>
        <CButton label={isScratch? "NEXT CARD": ""}  onclickStart={handleButtonMain} />
        <ImageFlip 
          imageFrontSrc="/images/200/fortunerabbit/front.png"
          imageBackSrc="/images/200/fortunerabbit/back.png" 
        />
    </Group>
  )
}

export default FortuneRabbit