import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';

type TPrizeFindProp = {
    dwidth: number;
    dheight: number;
    x?: number;
    y?: number;
    iconHeight: number;
    iconWeight: number;
    name: "pesos" | "fire"
}

function PrizeFind(props: TPrizeFindProp) {
    const {dheight, dwidth, iconHeight, iconWeight, name, x, y} = props;
    const [drawImage] = useImage("/images/50/lotto50/front.png");
    const [isImageDraw, setImageDraw] = React.useState<HTMLCanvasElement>();
    React.useEffect(() => {

        if(drawImage){
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = dwidth;
            canvasElement.height = dheight;
            const imageList = {
                pesos: {sx: dwidth*.118, sy: dwidth*2.266},
                fire: {sx: dwidth*.32, sy: dwidth*2.849}
            }
            context.drawImage(drawImage, imageList[name].sx, imageList[name].sy, 150, 150, 0, 0, canvasElement.width, canvasElement.height);
           
            setImageDraw(canvasElement);
        }

    },[drawImage, name]);


    return (
    <Group x={x} y={y}>
        <Image
            opacity={name == "fire"? 0.4: 1}
            image={isImageDraw}
            width={iconWeight}
            height={iconHeight}
            cornerRadius={iconHeight/2}
        />
    </Group>
  )
}

export default PrizeFind