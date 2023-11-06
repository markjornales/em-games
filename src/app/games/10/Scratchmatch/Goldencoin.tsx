import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TGoldencoinProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Goldencoin(props: TGoldencoinProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/match/goldcoin.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Goldencoin