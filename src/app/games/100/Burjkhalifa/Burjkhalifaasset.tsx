import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';


export type TBurjname = "20"|"50"|"100"|"1k"|"10k"|"100k"|"1m"

type TBurjkhalifaassetProps = { 
    imageWidth: number;
    imageHeight: number;  
    burjname: TBurjname
}

function Burjkhalifaasset(props: TBurjkhalifaassetProps) {
    const { imageHeight, imageWidth, burjname } = props;
    const [isImageRender] = useImage(`/images/100/burjkhalifa/${burjname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Burjkhalifaasset