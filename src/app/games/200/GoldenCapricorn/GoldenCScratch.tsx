import React from "react"; 
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
// import PopupAlert from '@/components/PopupAlert';
// import ScratchHere from '@/components/ScratchHere';
import { CanvasProvider } from '@/components/CanvasContext';
import { Group, Image, Rect, Text } from "react-konva";
// import useImage from "use-image";
import { Poppins } from "next/font/google";
import ScratchHere from "@/components/ScratchHere";
import useImage from "use-image";

const outfit = Poppins({
    subsets: ["latin"],
    weight: "500"
})

const GoldenCSCratch = (props: any) => {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const HEIGHT = React.useRef<number>(height*.8).current;
    const WIDTH = React.useRef<number>(width*.86).current;
    const x1 = React.useRef<number>(WIDTH*.2).current;
    const y1 = React.useRef<number>(HEIGHT*.49).current;
    const x2 = React.useRef<number>(WIDTH*.78).current;
    const y2 = React.useRef<number>(HEIGHT*.75).current
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/goldencapricorn/front.png"});
    const [image] = useImage("/images/200/goldencapricorn/back.png")

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-HEIGHT*.975)/2}>
                <Rect 
                    cornerRadius={10}
                    fill="white"
                    width={width*.859}
                    height={HEIGHT}
                />
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />
                <Group y={(HEIGHT - 10)*.928} x={WIDTH*.1}>
                    <Rect 
                        fill="white" 
                        width={WIDTH*.8} 
                        height={WIDTH*.11}
                    />
                    <Text 
                        align="center"
                        text="123-456-789-0" 
                        verticalAlign="middle"
                        width={WIDTH*.8} 
                        height={WIDTH*.11}
                        fontFamily={outfit.style.fontFamily}
                        fontSize={WIDTH*.06}
                    />
                </Group>
                {/* <Image 
                    image={image}
                    width={WIDTH}
                    height={HEIGHT}
                /> */}
            </Group>
            <ScratchHere 
                x={(width-width*.6)/2}
                y={(height-height*.2)*.65}
                height={height*.2}
                width={width*.6}
                BHeight={height}
                BWidth={width}
            />
        </Group>
    );
};

GoldenCSCratch.displayName = "GoldenCSCratch"

export default GoldenCSCratch;