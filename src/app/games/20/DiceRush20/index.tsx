import CButton from '@/components/CButton'
import ImageFlip from '@/components/ImageFlip'
import React from 'react'
import { Group } from 'react-konva'
import DiceScratch from './DiceScratch'

function DiceRush20() {
  return (
    <Group>
         <CButton label=""  onclickStart={() => {}} />
        {/* <ImageFlip 
            imageBackSrc="/images/20/dicerush/back.png" 
            imageFrontSrc="/images/20/dicerush/front.png"
          /> */}
          <DiceScratch
            combination={[
              [null, null],
              [3, null],
              [null, null],
            ]}
          />

    </Group>
  )
}

export default DiceRush20