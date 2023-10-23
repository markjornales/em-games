import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function FruitBlast100() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/100/fruitblast/back.png" 
            imageFrontSrc="/images/100/fruitblast/front.png"
          />
    </Group>
  )
}

export default FruitBlast100