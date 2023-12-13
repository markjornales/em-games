import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';


export type TColorProps = "green"|"pink"|"black"|"darkpink"|"red"

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
    colors: TColorProps
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth, colors } = props;
    const [isImageRender] = useImage(`/images/20/easytwo/${colors}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy