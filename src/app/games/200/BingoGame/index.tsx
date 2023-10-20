import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function BingoGame() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/200/bingo/bingoback.png" 
            imageFrontSrc="/images/200/bingo/bingofront.png"
          />
    </Group>
  )
}

export default BingoGame