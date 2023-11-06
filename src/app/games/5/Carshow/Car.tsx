import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TCarProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Car(props: TCarProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/carshow/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Car