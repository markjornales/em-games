import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TSpotcashProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Spotcash(props: TSpotcashProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/50/spotcash/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Spotcash