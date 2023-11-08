import React from 'react'
import { Image } from 'react-konva';
import useImage from 'use-image';
export type TcoloredBall = "purple"|"red"|"blue"

type TSuperBallProp = {
    dHeight: number;
    dWidth: number;
    imageWidth: number;
    imageHeight: number; 
    indexColor: number;
}

export type TColoredBallList = {
    [key: string]: {
        sx: number;
        sy: number;
    }
}

function SuperBall(props: TSuperBallProp) {
  const { dHeight, dWidth, imageHeight, imageWidth, indexColor} = props;
  const [isImageRender] = useImage("/images/200/superball/back.png");
  const [isImageCanvas, setImageCanvas] = React.useState<HTMLCanvasElement>();
  React.useEffect(() => {
    const renderImage = () => {
        if(!isImageRender) return null;
        const canvasElement = document.createElement("canvas");
        const context = canvasElement.getContext("2d")!;
        canvasElement.width = dWidth;
        canvasElement.height = dWidth;
        const coloredBall = [
            {sx: dWidth*1.886, sy: dWidth*3.827},
            {sx: dWidth*1.633, sy: dWidth*3.827},
            {sx: dWidth*1.38, sy: dWidth*4.087},
        ]
        context.beginPath(); 
        context.arc(175, 174, 160, 0, 2 * Math.PI,) 
        context.closePath();
        context.clip();
        context.drawImage(isImageRender, coloredBall[indexColor].sx, coloredBall[indexColor].sy, 78, 78,0, 0, canvasElement.width, canvasElement.height);
        setImageCanvas(canvasElement);
    }
    renderImage();
  },[isImageRender, indexColor]);

  return (
    <Image 
        image={isImageCanvas}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default SuperBall