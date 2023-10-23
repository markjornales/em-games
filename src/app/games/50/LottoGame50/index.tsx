import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'

function LottoGame50() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        <ImageFlip 
            imageBackSrc="/images/50/lotto50/back.png" 
            imageFrontSrc="/images/50/lotto50/front.png"
          />
    </Group>
  )
}

export default LottoGame50