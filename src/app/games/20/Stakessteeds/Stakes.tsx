import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TStakesProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Stakes(props: TStakesProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/20/stakesandsteeds/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Stakes