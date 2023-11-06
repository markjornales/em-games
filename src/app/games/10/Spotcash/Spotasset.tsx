import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TSpotassetProps = { 
    imageWidth: number;
    imageHeight: number; 
    assetname: "cash"|"bag"
}

function Spotasset(props: TSpotassetProps) {
    const { imageHeight, imageWidth, assetname } = props;
    const [isImageRender] = useImage(`/images/10/spotcash/${assetname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Spotasset