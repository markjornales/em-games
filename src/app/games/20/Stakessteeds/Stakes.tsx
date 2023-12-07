import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TStakesname = "5"|"10"|"20"|"50"|"100"|"500"|"1k"|"2k"|"20k"|"200k"
type TStakesProps = { 
    imageWidth: number;
    imageHeight: number;
    stakesname: TStakesname
}

function Stakes(props: TStakesProps) {
    const { imageHeight, imageWidth, stakesname } = props;
    const [isImageRender] = useImage(`/images/20/stakesandsteeds/${stakesname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Stakes