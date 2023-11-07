import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBurjkhalifaassetProps = { 
    imageWidth: number;
    imageHeight: number;  
}

function Burjkhalifaasset(props: TBurjkhalifaassetProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/100/burjkhalifa/money.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Burjkhalifaasset