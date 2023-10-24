import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import LuckySlotsScratch from './LuckySlotsScratch'

function LuckySlots100() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        {/* <ImageFlip 
            imageBackSrc="/images/100/luckyslots/back.png" 
            imageFrontSrc="/images/100/luckyslots/front.png"
          /> */}
          <LuckySlotsScratch/>
    </Group>
  )
}

export default LuckySlots100