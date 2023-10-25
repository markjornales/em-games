import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto10Scratch from './Lotto10Scratch'

function LottoGame10() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        {/* <ImageFlip 
            imageBackSrc="/images/10/lottogame/back.png" 
            imageFrontSrc="/images/10/lottogame/front.png"
          /> */}
          <Lotto10Scratch/>
    </Group>
  )
}

export default LottoGame10