import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TUsaProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Usa(props: TUsaProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/50/usa/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Usa