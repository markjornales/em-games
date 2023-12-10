import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

export type TRadirNameProp = "5"|"10"|"20"|"50"|"100"|"200"|"500"|"1k"|"5k"|"50k"|"500k" 

type TRidersProps = { 
    imageWidth: number;
    imageHeight: number;
    ridername: TRadirNameProp
}

function Riders(props: TRidersProps) {
    const { imageHeight, imageWidth, ridername } = props;
    const [isImageRender] = useImage(`/images/50/ridersfortune/${ridername}.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Riders