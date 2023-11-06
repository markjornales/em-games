import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TLuckydragonProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Luckydragon(props: TLuckydragonProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/Luckydragon/dragon.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Luckydragon