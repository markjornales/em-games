import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TGalacticProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Galactic(props: TGalacticProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/galactic/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Galactic