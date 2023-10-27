import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image'

type TBingo = {
    width: number;
    height: number;
    imageHeight: number;
    imageWidth: number;
    bingoletter: "letterB"|"letterI"|"letterN"|"letterG"|"letterO";
    cornerRadius?: number;
    selected: boolean;
}

function Bingo(props: TBingo) {
    const {  height, width, imageHeight, imageWidth, bingoletter, cornerRadius, selected} = props;
    const [isRenderImage] = useImage("/images/200/bingo/bingofront.png");
    const [isCanvasImage, setCanvasImage] = React.useState<HTMLCanvasElement>();
    
    React.useEffect(() => {
        if(isRenderImage){
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = width;
            canvasElement.height = height;
            const bingoletters = {
                letterB: {sx: width*1.12, sy: width*3.74, swidth: 170, sheight: 170},
                letterI: {sx: width*1.12, sy: width*3.17, swidth: 0, sheight: 0},
                letterN: {sx: width*1.12, sy: width*2.6, swidth: 0, sheight: 0},
                letterG: {sx: width*1.74, sy: width*3.51, swidth: 0, sheight: 0},
                letterO: {sx: width*1.74, sy: width*2.78, swidth: 0, sheight: 0},
            }
            context.drawImage(isRenderImage, bingoletters[bingoletter].sx, bingoletters[bingoletter].sy, 170, 170, 0, 0, canvasElement.width, canvasElement.height);
            setCanvasImage(canvasElement);
          }
    },[isRenderImage]);



  return (
    <Group>
        <Image
            opacity={selected? 1: 0.3}
            cornerRadius={cornerRadius} 
            image={isCanvasImage}
            width={imageWidth}
            height={imageHeight}
        />
    </Group>
  )
}

export default Bingo