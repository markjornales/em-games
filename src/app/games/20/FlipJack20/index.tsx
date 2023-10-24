import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function FlipJack20() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/20/flipjack/back.png" 
            imageFrontSrc="/images/20/flipjack/front.png"
          />
    </Group>
  )
}

export default FlipJack20