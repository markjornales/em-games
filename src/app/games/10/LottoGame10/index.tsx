import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function LottoGame10() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/10/lottogame/back.png" 
            imageFrontSrc="/images/10/lottogame/front.png"
          />
    </Group>
  )
}

export default LottoGame10