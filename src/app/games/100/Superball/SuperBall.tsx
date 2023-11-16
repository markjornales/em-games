import React from 'react'
import { Image } from 'react-konva';
import useImage from 'use-image';
export type TcoloredBall = ("blue"|"green"|"orange"|"red"|"violet")|string

type TSuperBallProp = { 
    imageWidth: number;
    imageHeight: number; 
    ballcolor: TcoloredBall;
}

export type TColoredBallList = {
    [key: string]: {
        sx: number;
        sy: number;
    }
}

function SuperBall(props: TSuperBallProp) {
  const { imageHeight, imageWidth, ballcolor} = props;
  const [ isImageRender ] = useImage(`/images/200/superball/${ballcolor}-w-r.png`);
  return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default SuperBall