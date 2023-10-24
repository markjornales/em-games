import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import Lotto100Scratch from './Lotto100Scratch'

function LottoGame100() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        {/* <ImageFlip 
            imageBackSrc="/images/100/lotto100/back.png" 
            imageFrontSrc="/images/100/lotto100/front.png"
          /> */}
          <Lotto100Scratch/>
    </Group>
  )
}

export default LottoGame100