import { CanvasProvider } from '@/components/CanvasContext';
import React from 'react';
import { Group, Image, Rect, Text, } from "react-konva";
import { Poppins } from 'next/font/google';
import useScratchMethod from './hooks/useScratchMethod';
import useImage from 'use-image';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
})

export type TStagePos = {
    x: number;
    y: number;
}
 
const sampleResults = [
    [true, false, false, false, false],
    [false, false, false, false, false],
    [false, false, true, false, true],
    [false, true, false, false, false],
]
 
function ScratchGames(props: any, ref: any) {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize; 
    const imageRef = React.useRef<React.ComponentRef<typeof Image>>(null);
    const isPaint = React.useRef<boolean>(false);
    const WIDTH = width*.862;
    const HEIGHT = height*.8; 
    const x1 = (WIDTH - WIDTH*.8)/2;
    const x2 = ((WIDTH - WIDTH*.8)/2) + WIDTH*.8
    const y1 = (HEIGHT-HEIGHT*.35)*.85
    const y2 = (HEIGHT-HEIGHT*.35)*.85 + HEIGHT*.35
    const {canvas, isScratchDone, setStagePointerPos, setScratchDone} = useScratchMethod({HEIGHT, WIDTH, x1, y1});

    React.useImperativeHandle(ref, () => ({
        reset: () => { 
            setScratchDone(false);
            setStagePointerPos([]);
        },
        isScratchDone
    }));

    const scratchScope = ({x, y} : TStagePos) => {
        return (x > x1 && x < x2) && (y > y1 && y < y2)? true: false
    }

    const handleMouseDown = React.useCallback(() => {
        isPaint.current = true;  
        const position = imageRef.current?.getRelativePointerPosition()!;
        if(scratchScope(position) && !isScratchDone){
            setStagePointerPos((initstage) => [...initstage, {
                moveTo: {x: Math.ceil(position.x), y: Math.ceil(position.y)},
                lineTo: []
            }]);   
        }
    },[])

    const handleMouseMove = React.useCallback(() => {
        if(isPaint.current){ 
            const position = imageRef.current?.getRelativePointerPosition()!;
            if(scratchScope(position) && !isScratchDone){
                setStagePointerPos((initstage) => {
                    initstage[initstage.length - 1].lineTo.push({x: Math.ceil(position.x), y: Math.ceil(position.y)})
                    return [...initstage];
                });  
            } 
        }
    },[])

    const handleOnPointerLeave = () => {
        isPaint.current = false
    }

    const handleMouseUp = () => { 
        isPaint.current = false;
    }
  return (
     <Group y={(height-(height*.78))/2} x={(width-width*.86)/2}>  
        <Rect
            fill="white"
            width={width*.86}
            height={height*.8}
            cornerRadius={10}
        />
           {sampleResults.map((data, index) => {
            let ypos = .097 * index; 
            return data.map((value, indexValue) => {   
                let xpos= .17 * indexValue; 
                return value? <ImageTrue 
                    key={index+indexValue}
                    HEIGHT={HEIGHT}
                    WIDTH={WIDTH}
                    x={xpos}
                    y={ypos}
                    />: 
                    <ImageFalse
                        key={index+indexValue}
                        HEIGHT={HEIGHT}
                        WIDTH={WIDTH}
                        x={xpos-0.17}
                        y={ypos}
                    />  
                     
            })
        })}
        <Image
            cornerRadius={10} 
            ref={imageRef}
            image={canvas}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleOnPointerLeave}
        /> 
        <Group 
            x={(WIDTH-WIDTH*.9)/2}
            y={(HEIGHT*.994)-WIDTH*.1}>
            <Rect 
                fill="white"
                width={WIDTH*.9}
                height={WIDTH*.09}
            />
            <Text
                width={WIDTH*.9}
                height={WIDTH*.10}
                text="123-4567-890"
                align="center"
                letterSpacing={3}
                verticalAlign="middle"
                fontFamily={poppins.style.fontFamily}
                fontSize={WIDTH*.07}
            />
        </Group>  
        
     </Group>
  )
}

const ImageFalse = ({WIDTH, HEIGHT, x, y}: {WIDTH: number;HEIGHT: number}& TStagePos) => {
    const [isTrueImage, setTrueImage] = React.useState<HTMLCanvasElement>();

    const [image] = useImage('/images/CardFlip.png');
    
    React.useEffect(() => {
        if(image) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            context.beginPath();
            context.drawImage(image, WIDTH*.174, WIDTH*1.532, 100, 100, 0, 0, canvas.width, canvas.height);
            setTrueImage(canvas); 
        }
        
    },[image]);

    return (
        <Image
            opacity={0.4}
            y={HEIGHT*(.545 + y)} //increase by .97
            x={WIDTH*(.28 + x)} //increate by 17
            cornerRadius={WIDTH*.13/2}
            width={WIDTH*.13}
            height={WIDTH*.13}
            image={isTrueImage}
        />
    )
}


const ImageTrue = ({WIDTH, HEIGHT, y, x}: {WIDTH: number;HEIGHT: number}& TStagePos) => {
    const [isTrueImage, setTrueImage] = React.useState<HTMLCanvasElement>();

    const [image] = useImage('/images/CardFlip.png');
    
    React.useEffect(() => {
        if(image) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            canvas.width = WIDTH;
            canvas.height = HEIGHT;
            context.beginPath();
            context.drawImage(image, WIDTH*.06, WIDTH*1.218 , 100, 100, 0, 0, canvas.width, canvas.height);
            setTrueImage(canvas); 
            
        }
        
    },[image]);
    return (
        <Image
            y={HEIGHT*(.545 + y)}
            x={WIDTH*(.11 + x)}
            cornerRadius={WIDTH*.13/2}
            width={WIDTH*.13}
            height={WIDTH*.13}
            image={isTrueImage}
            
        />
    )
}

export default React.forwardRef(ScratchGames)