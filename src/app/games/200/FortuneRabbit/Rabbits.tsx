import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';

type TRabbits = {
    width: number;
    heigth: number;
    x?: number;
    y?: number;
    show: boolean;
};

function Rabbits(props: TRabbits) {
    const {heigth, width, show, x, y} = props;
    const [isRabbitImage, setRabbitImage] = React.useState<HTMLCanvasElement>();
    const [isImageShow] = useImage("/images/200/fortunerabbit/back.png");

    React.useEffect(() => {
        if(isImageShow) {
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = width;
            canvasElement.height = heigth;
            context.drawImage(isImageShow, width*1.524, width*1.745, 80, 80, 0, 0, canvasElement.width, canvasElement.height); 
            setRabbitImage(canvasElement);
        }
    },[isImageShow]);

    return (
    <Group x={x} y={y}>
        <Image 
            opacity={show ? 1: 0.3}
            image={isRabbitImage}
            width={width*.20}
            height={width*.20}
        />
    </Group>
  )
}

export default Rabbits