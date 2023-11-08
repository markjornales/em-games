import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBingoProps = { 
    imageWidth: number;
    imageHeight: number;
    assetname: "b"|"i"|"n"|"g"|"o"
}

function Bingo(props: TBingoProps) {
    const { imageHeight, imageWidth, assetname } = props;
    const [isImageRender] = useImage(`/images/20/bingo/${assetname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Bingo