import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBananaProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Banana(props: TBananaProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/jungleadventure/banana.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Banana