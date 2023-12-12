import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/easytwo/.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy