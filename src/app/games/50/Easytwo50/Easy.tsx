import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TGoldname = "circle_gold"|"star_gold"

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
    goldname: TGoldname
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth, goldname} = props;
    const [isImageRender] = useImage(`/images/50/easytwo/${goldname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy