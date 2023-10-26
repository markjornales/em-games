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
    
}

function DiceImage(props: TDiceImage) {
    const { dheight, dwidth, imageHeight, imageWidth, x, y} = props;
    const [drawImages] = useImage("/images/50/diceroller/front.png");
    const [isImageShow, setImageShow] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        if(drawImages) {
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = dwidth;
            canvasElement.height = dheight;

            context.drawImage(drawImages, dwidth*.3, dwidth*2.1, 190, 250, 0, 0, canvasElement.width, canvasElement.height)
            setImageShow(canvasElement);
        }
    },[drawImages, ]);

    return (
        <Group y={y} x={x}>
            <Image 
                image={isImageShow}
                width={imageWidth}
                height={imageHeight}
                cornerRadius={5}
            />
        </Group>
    );
}

export default DiceImage