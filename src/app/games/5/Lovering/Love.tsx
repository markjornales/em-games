import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TLoveProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Love(props: TLoveProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/lovering/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Love