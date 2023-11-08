import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type THorseassetProps = { 
    imageWidth: number;
    imageHeight: number;  
}

function Horseasset(props: THorseassetProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/100/horse/horse.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Horseasset