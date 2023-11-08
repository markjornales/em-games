import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TRouletteProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Roulette(props: TRouletteProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/100/roulette/roulettes.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Roulette