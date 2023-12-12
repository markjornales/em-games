import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TCasinoname = "5"|"10"|"20"|"50"|"100"|"200"|"500"|"1k"|"5k"|"50k"|"500k" 
type TCasinoProps = { 
    imageWidth: number;
    imageHeight: number;
    casinoname: TCasinoname
}

function Casino(props: TCasinoProps) {
    const { imageHeight, imageWidth, casinoname } = props;
    const [isImageRender] = useImage(`/images/50/casino/${casinoname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Casino