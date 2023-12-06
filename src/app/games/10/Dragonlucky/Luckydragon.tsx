import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TLuckydragon= "5"|"10"|"50"|"100"|"500"|"1k"|"10k"|"100k"|"goldcoin";
type TLuckydragonProps = { 
    imageWidth: number;
    imageHeight: number;
    luckydragon: TLuckydragon
}

function Luckydragon(props: TLuckydragonProps) {
    const { imageHeight, imageWidth, luckydragon } = props;
    const [isImageRender] = useImage(`/images/10/luckydragon/${luckydragon}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Luckydragon