import { useSpring } from "@react-spring/konva";
import React from 'react';
import { Image } from "react-konva";
import { animated } from 'react-spring';
import useImage from 'use-image';


const ImageAnimation:any = animated(Image);
type TWinnerLoseImage = {
    size: number;  
    value: boolean
    isScratchDone: boolean
};

 const WinnerLoseImage =  (props: TWinnerLoseImage) => {
    const { size, value, isScratchDone} = props; 
    const [imageElement] = useImage(`/images/200/Lottogame/${value? "pesos": "fire"}.png`);
    const {scale} = useSpring({
        from: { scale: 0 },
        to: { scale: isScratchDone? 1: 0 }, 
        config: {duration: 1000},
        loop: true,
    });

    return ( 
        <ImageAnimation 
            opacity={!value? 0.6: 1} 
            width={size*.16}
            height={size*.16}
            image={imageElement}
            {...value && { 
                height: scale.to({
                    range: [0, 0.5, 1],
                    output: [size*.13, size*.14, size*.13]
                }),
                width: scale.to({
                    range: [0, 0.5, 1],
                    output: [size*.13, size*.14, size*.13]
                })

            }} 
        /> 
    );
}

WinnerLoseImage.displayName = "WinnerLoseImage"
 
export default WinnerLoseImage; 