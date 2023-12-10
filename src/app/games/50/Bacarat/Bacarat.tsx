import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TBaracatName = "5"|"10"|"20"|"50"|"100"|"200"|"500"|"1k"|"5k"|"50k"|"500k" 

type TBacaratProps = { 
    imageWidth: number;
    imageHeight: number;
    baracatname: TBaracatName
}

function Bacarat(props: TBacaratProps) {
    const { imageHeight, imageWidth, baracatname } = props;
    const [isImageRender] = useImage(`/images/50/bacarat/${baracatname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Bacarat