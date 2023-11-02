import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TJokerProp = {
    dHeight: number;
    dWidth: number;
    imageWidth: number;
    imageHeight: number;
};

function Joker(props: TJokerProp) {
    const { dHeight, dWidth, imageHeight, imageWidth} = props;
    const [isImageRender] = useImage("/images/200/casinojoker/back.png");
    const [isImageCanvas, setImageCanvas] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        const renderImage = () => {
            if(!isImageRender) return null;
            const canvasElement = document.createElement("canvas");
            const context =canvasElement.getContext("2d")!;
            canvasElement.width = dWidth;
            canvasElement.height = dHeight;
            context.drawImage(isImageRender, dWidth*1.22, dWidth*2.565, 200, 150, 0, 0, canvasElement.width, canvasElement.height);
            setImageCanvas(canvasElement);
        }
        renderImage();
    }, [isImageRender]);

  return (
    <Image 
        image={isImageCanvas}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Joker