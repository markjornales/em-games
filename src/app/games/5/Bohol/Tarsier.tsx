import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TTarsierProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Tarsier(props: TTarsierProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/bohol/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Tarsier