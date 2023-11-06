import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TCoinpandaProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Coinpanda(props: TCoinpandaProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/panda/coin.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Coinpanda