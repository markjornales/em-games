import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TMangoProps = { 
    imageWidth: number;
    imageHeight: number;
    assetname: "apple"|"melon"|"orange"|"grape"|"mango"
}

function Mango(props: TMangoProps) {
    const { imageHeight, imageWidth, assetname } = props;
    const [isImageRender] = useImage(`/images/20/mango/${assetname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Mango