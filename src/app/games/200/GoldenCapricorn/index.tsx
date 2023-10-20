import React from 'react'
import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
 import { Group } from 'react-konva'
import GoldenCSCratch from './GoldenCScratch';

function GoldenCapricorn() {
  const [isScratch, setScratch] = React.useState<boolean>(false);
  
  const handleButtonMain = () => {
    if(!isScratch) {
      setScratch(true);
      return;
    }
    
  }
  
  return (
    <Group>
      <CButton label={isScratch? "NEXT CARD": ""}  onclickStart={handleButtonMain} />
      {isScratch? 
        <GoldenCSCratch/>:
        <ImageFlip 
          imageFrontSrc="/images/200/goldencapricorn/front.png"
          imageBackSrc="/images/200/goldencapricorn/back.png" 
        />
      }
    </Group>
  )
}

export default GoldenCapricorn