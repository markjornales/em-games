import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TCasinoProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Casino(props: TCasinoProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/50/casino/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Casino