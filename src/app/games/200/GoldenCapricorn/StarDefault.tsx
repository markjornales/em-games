import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import useImage from 'use-image';
import {useSpring, animated as Animated} from "@react-spring/konva"

type TStarDefault = {
    width: number;
    height: number;
    star?: boolean;
    iconWidth: number;
    iconHeight: number;
    y?: number;
    x?:number;
    isScratchDone?: boolean;
}
const ImageAnimation:any = Animated(Image);
function StarDefault(props: TStarDefault) {
    const {height, width, star, iconHeight, iconWidth, x, y, isScratchDone} = props;
    const [starImage, setStarImage] = React.useState<HTMLCanvasElement>()
    const [image] = useImage(`/images/200/goldencapricorn/${!star? "front": "back"}.png`);
    const {scale} = useSpring({
        from: { scale: 0 },
        to: { scale: isScratchDone? 1: 0 }, 
        config: {duration: 1000},
        loop: true,
    });


    React.useEffect(() => {
        if(image){
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!;
            canvasElement.width = width;
            canvasElement.height = height;
            const xstar = !star? width*.57: width*.404;
            const ystar = !star? width*2.05:width*2.140
            const wstar = !star? 160: 106;
            const hstar = !star? 160: 120;
            context.drawImage(image, xstar, ystar, wstar, hstar, 0, 0, canvasElement.width, canvasElement.height);
            const drawimages = context.getImageData(0, 0, canvasElement.width, canvasElement.height);    
            for(let i = 0; i < drawimages.data.length; i += 4) {
                const r = drawimages.data[i];
                const g = drawimages.data[i + 1];
                const b = drawimages.data[i + 2]; 
                if(!star) {
                    if(r == 188 && g == 117 && b == 15) {
                        drawimages.data[i] = 255;   
                        drawimages.data[i + 1] = 255;   
                        drawimages.data[i + 2] = 255;  
                        drawimages.data[i + 3] = 0;  
                    }
                }
                else {
                    if(r == 236 && g == 236 && b == 236) {
                        drawimages.data[i + 3] = 0;
                    }
                } 
            }
            context.putImageData(drawimages, 0, 0);
            setStarImage(canvasElement);
        }  
    }, [image]);

  return (
    <Group x={x} y={y}>
        <ImageAnimation   
            opacity={star? 1: 0.4}
            image={starImage}
            width={iconWidth}
            height={iconHeight}
            {...star && {
                height: scale.to({
                    range: [0, 0.5, 1],
                    output: [iconHeight, iconHeight*1.09, iconHeight]
                }),
                width: scale.to({
                    range: [0, 0.5, 1],
                    output: [iconWidth, iconWidth*1.09, iconWidth]
                })
            }}
        />
    </Group>
  )
}

export default StarDefault