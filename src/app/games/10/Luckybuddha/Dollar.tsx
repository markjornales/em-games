import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TDollarProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Dollar(props: TDollarProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/luckybuddha/dollar.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Dollar