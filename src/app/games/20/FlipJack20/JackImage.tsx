import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';
import { TCombination } from './FlipJackSratch';

type TJackImage = {
    dwidth: number;
    dheight: number;
    x?: number;
    y?: number;
    imageHeight: number;
    imageWidth: number;
    value: TCombination|undefined
}

function JackImage(props: TJackImage) {
    const { dheight, dwidth, imageHeight, imageWidth, x, y, value} = props;
    const [drawImages] = useImage("/images/20/flipjack/front.png");
    const [isImageShow, setImageShow] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        if(drawImages) {
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = dwidth;
            canvasElement.height = dheight;

            context.drawImage(drawImages, dwidth*.46, dwidth*2.874, 197, 270, 0, 0, canvasElement.width, canvasElement.height)
            setImageShow(canvasElement);
        }
    },[drawImages, ]);

    return (
        <Group y={y} x={x}>
            <Image
                opacity={value? 1: 0.3}
                image={isImageShow}
                width={imageWidth}
                height={imageHeight}
                cornerRadius={5}
            />
        </Group>
    );
}

export default JackImage