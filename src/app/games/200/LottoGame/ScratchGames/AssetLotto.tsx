import { Group, Image, Rect, Text, } from "react-konva";
import React from 'react';
import { animated, Spring } from 'react-spring';
import {useSpring, animated as Animated} from "@react-spring/konva"
import useImage from 'use-image';
import { TStagePos } from ".";


const ImageAnimation:any = animated(Image);
type TWinnerLoseImage = {
    width: number;
    height: number;
    src: string;
    imgWidth: number;
    imgHeight: number;
    opacity?: number;
    value?: boolean
    isScratchDone: boolean
} & TStagePos;

 const WinnerLoseImage =  (props: TWinnerLoseImage) => {
    const {src, height, width, imgHeight, imgWidth, x, y, opacity = 1, value, isScratchDone} = props;
    const [isCanvasImage, setCanvasImage] = React.useState<HTMLCanvasElement>();
    const [imageElement] = useImage(src);
    const {scale} = useSpring({
        from: { scale: 0 },
        to: { scale: isScratchDone? 1: 0 }, 
        config: {duration: 1000},
        loop: true,
    });

    React.useEffect(() => {
        if(imageElement){
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            canvas.width = width;
            canvas.height = height;
            context.beginPath();
            context.drawImage(imageElement, width*imgWidth, width * imgHeight, 155, 155, 0, 0, canvas.width, canvas.height);
            setCanvasImage(canvas);
        }
    },[imageElement]); 

    return ( 
            <ImageAnimation
                cornerRadius={width*.13/2}
                opacity={opacity}
                y={height*y}
                x={width*x}
                width={width*.13}
                height={width*.13}
                image={isCanvasImage}
                {...value && {
                    cornerRadius: scale.to({
                        range: [0, 0.5, 1],
                        output: [width*.13/2, 50, width*.13/2]
                    }),
                    height: scale.to({
                        range: [0, 0.5, 1],
                        output: [width*.13, width*.14, width*.13]
                    }),
                    width: scale.to({
                        range: [0, 0.5, 1],
                        output: [width*.13, width*.14, width*.13]
                    })

                }} 
            /> 
    );
}

WinnerLoseImage.displayName = "WinnerLoseImage"


export {WinnerLoseImage}; 