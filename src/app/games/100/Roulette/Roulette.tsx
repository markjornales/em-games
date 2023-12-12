import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TRouletteName = "20"|"50"|"100"|"1k"|"10k"|"100k"|"1m"

type TRouletteProps = { 
    imageWidth: number;
    imageHeight: number;
    rouletteName:TRouletteName
}

function Roulette(props: TRouletteProps) {
    const { imageHeight, imageWidth, rouletteName } = props;
    const [isImageRender] = useImage(`/images/100/roulette/${rouletteName}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Roulette