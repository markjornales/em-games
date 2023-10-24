import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function LottoGame20() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/20/lottogame/back.png" 
            imageFrontSrc="/images/20/lottogame/front.png"
          />
    </Group>
  )
}

export default LottoGame20