import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image'


type TFruitsProps = {
    dwidth: number;
    dheight: number;
    fruitName: "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
    iconHeight: number;
    iconWidth: number;
    x?: number;
    y?: number;
}



function Fruits(props: TFruitsProps) {
    const {dheight, dwidth, fruitName, iconHeight, iconWidth, x, y} = props;
    const [image] = useImage("/images/100/fruitblast/back.png");
    const [isImageCanvas, setImageCanvas] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        if(image){
            const fruitslist = {
                strawberry: {sx: dwidth*1.467, sy: dwidth*1.68, swidth: 90, sheight: 90},
                avocado: {sx: dwidth*1.54, sy: dwidth*1.91, swidth: 90, sheight: 90},
                cherry: {sx: dwidth*1.51, sy: dwidth*2.157, swidth: 75, sheight: 75},
                banana: {sx: dwidth*1.472, sy: dwidth*2.37, swidth: 90, sheight: 90},
                apple: {sx: dwidth*1.49, sy: dwidth*2.63, swidth: 90, sheight: 90}
            }
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = dwidth;
            canvasElement.height = dheight;
            if(fruitName) {
                context.drawImage(image, 
                    fruitslist[fruitName].sx, 
                    fruitslist[fruitName].sy, 
                    fruitslist[fruitName].swidth, 
                    fruitslist[fruitName].sheight, 0, 0,
                    canvasElement.width, 
                    canvasElement.height
                );
            }else {
                 context.drawImage(image, 
                    fruitslist["apple"].sx, 
                    fruitslist["apple"].sy, 
                    fruitslist["apple"].swidth, 
                    fruitslist["apple"].sheight, 0, 0,
                    canvasElement.width, 
                    canvasElement.height
                );
            }
            setImageCanvas(canvasElement);
        }
    },[image, fruitName]);

  return (
    <Group x={x} y={y}>
        <Image 
            opacity={fruitName == undefined? 0.2: 1}
            image={isImageCanvas}
            height={iconHeight}
            width={iconWidth}
        />
    </Group>
  )
}

export default Fruits