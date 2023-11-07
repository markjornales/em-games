import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBaliProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Bali(props: TBaliProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/20/baliindonesia/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Bali