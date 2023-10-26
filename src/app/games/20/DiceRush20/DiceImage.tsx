import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';

type TDiceImage = {
    dwidth: number;
    dheight: number;
    x?: number;
    y?: number;
    imageHeight: number;
    imageWidth: number;
    dicesValue: number|null;
}

function DiceImage(props: TDiceImage) {
    const { dheight, dwidth, imageHeight, imageWidth, dicesValue, x, y} = props;
    const [drawImages] = useImage("/images/20/dicerush/back.png");
    const [isImageShow, setImageShow] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        if(drawImages) {
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = dwidth;
            canvasElement.height = dheight;
            const dices = [
                {sx: dwidth*1.02, sy: dwidth*1.63},
                {sx: dwidth*1.682, sy: dwidth*1.63},
                {sx: dwidth*1.02, sy: dwidth*2.076},
                {sx: dwidth*1.682, sy: dwidth*2.076},
                {sx: dwidth*1.02, sy: dwidth*2.521},
                {sx: dwidth*1.682, sy: dwidth*2.521},
            ];
            
            context.drawImage(drawImages, dices[dicesValue|| 0].sx, dices[dicesValue|| 0].sy, 155, 155, 0, 0, canvasElement.width, canvasElement.height);
            setImageShow(canvasElement);
        }
    },[drawImages, dicesValue]);

    return (
        <Group y={y} x={x}>
            <Image 
                opacity={dicesValue != null? 1: 0.2}
                image={isImageShow}
                width={imageWidth}
                height={imageHeight}
            />
        </Group>
    );
}

export default DiceImage