import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TColors = "red"|"blue"|"green"|"pink"|"yellow"

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
    colors: TColors
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth, colors } = props;
    const [isImageRender] = useImage(`/images/5/easytwo/${colors}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy