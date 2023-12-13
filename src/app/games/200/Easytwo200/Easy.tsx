import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';


type TGoldFishName = "00"|"01"|"10"|"11"|"dragon"

type TEasyProps = { 
    imageWidth: number;
    imageHeight: number;
    goldenfishname: TGoldFishName
}

function Easy(props: TEasyProps) {
    const { imageHeight, imageWidth, goldenfishname} = props;
    const [isImageRender] = useImage(`/images/200/easytwo/${goldenfishname}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Easy