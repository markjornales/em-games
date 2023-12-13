import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TGoldName = "crown_gold"|"gold_bar"

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
    goldname: TGoldName
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth, goldname } = props;
    const [isImageRender] = useImage(`/images/100/easytwo/${goldname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy