import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TGoldenProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Golden(props: TGoldenProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/goldenbuddha/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Golden