import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TGoldBarsProps = { 
    imageWidth: number;
    imageHeight: number;
    showGold: boolean;
}

function GoldBars(props: TGoldBarsProps) {
    const { imageHeight, imageWidth, showGold } = props;
    const [isImageRender] = useImage(`/images/200/thailandbangkok/${showGold? "gold": "buddha"}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default GoldBars