import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";    
import Roulette from './Roulette';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TRouletteScratch  = {
    combination: boolean[][];
     reference: string; 
     scratchdone: (done: boolean) => void;
}
type TRouletteScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const RouletteScratch = React.forwardRef<TRouletteScratchRef, TRouletteScratch>((props, ref) => {
    const { combination , reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.24;
    const y1 = HEIGHT*.06;
    const x2 = WIDTH*.79;
    const y2 = HEIGHT*.38
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/roulette/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 10});


    React.useEffect(() => {
        if(isScratchDone){ 
            setModalshow(true);
            scratchdone(true);
        }
    },[isScratchDone]);

    React.useImperativeHandle(ref, () => ({
        isScratchDone,
        reset: () => { 
            setScratchDone(false);
            setStagePointerPos([]);
            setFastScratch(false)
        },
        fastscratch: () => {
            setFastScratch(true) 
        }
    }));
    
    const rouletteCombi = React.useMemo(() => combination.map((data, indexRow) => 
        data.map((values, indexColumn) =>  
        <Group 
            key={indexRow + indexColumn}
            opacity={values? 1: 0.4}
            x={WIDTH*(.238 + (0.194 * indexColumn))} 
            y={HEIGHT*(.052 + (0.119 * indexRow))}>
            <Roulette
            imageHeight={WIDTH*.20}
            imageWidth={WIDTH*.18}
            />
        </Group>
        )
    ),[combination])

    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && rouletteCombi}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                  <Group y={HEIGHT*.925} x={WIDTH*.02}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.85}
                        height={WIDTH*.10}
                    />
                    <Text 
                        text={reference} 
                        width={WIDTH*.8} 
                        height={WIDTH*.12}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.07}
                    />
                </Group> 
            </Group>
            <PopupAlert 
                visible={isModalShow}
                height={height}
                width={width}
                onTap={() => {
                    setModalshow(false);
                }}
            />
        </Group>
    );
});

RouletteScratch.displayName = "RouletteScratch"

export default RouletteScratch;