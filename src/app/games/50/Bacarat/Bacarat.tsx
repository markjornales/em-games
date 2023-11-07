import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBacaratProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Bacarat(props: TBacaratProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/50/bacarat/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Bacarat