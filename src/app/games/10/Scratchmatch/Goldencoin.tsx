import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TCoinname= "5"|"10"|"50"|"100"|"500"|"1k"|"10k"|"100k"|"goldcoin";
type TGoldencoinProps = { 
    imageWidth: number;
    imageHeight: number; 
    coinname: TCoinname
}

function Goldencoin(props: TGoldencoinProps) {
    const { imageHeight, imageWidth, coinname } = props;
    const [isImageRender] = useImage(`/images/10/match/${coinname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Goldencoin