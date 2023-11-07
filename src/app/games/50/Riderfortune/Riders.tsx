import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TRidersProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Riders(props: TRidersProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/50/ridersfortune/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Riders