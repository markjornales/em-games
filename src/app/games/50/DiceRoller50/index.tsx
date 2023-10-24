import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function DiceRoller50() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/50/diceroller/back.png" 
            imageFrontSrc="/images/50/diceroller/front.png"
          />
    </Group>
  )
}

export default DiceRoller50