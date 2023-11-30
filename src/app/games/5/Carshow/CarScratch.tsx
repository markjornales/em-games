import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Car from './Car';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TCarScratch = {
    combination: boolean[][] 
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TCarRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const CarScratch = React.forwardRef<TCarRef, TCarScratch>((props, ref) => {
    const { combination , reference, scratchdone, } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.24;
    const y1 = HEIGHT*.08;
    const x2 = WIDTH*.70;
    const y2 = HEIGHT*.48
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/5/carshow/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 18});

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

    const handleCombinations = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.25 + (0.16 * indexColumn)) } 
                y={HEIGHT*(.08 + (0.15 * indexRow))} 
                key={indexRow + indexColumn}>
                <Car imageHeight={WIDTH*.2} imageWidth={WIDTH*.1}/>
            </Group>
            )
        )
    },[combination])
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleCombinations}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />    
                <Group x={WIDTH*.872} y={HEIGHT*.075}>
                    <Rect 
                        rotation={90}
                        offsetY={WIDTH*.1}
                        fill="white" 
                        width={WIDTH*.66}
                        height={WIDTH*.1}
                    />
                    <Text 
                        x={2}
                        rotation={-90}
                        offsetX={WIDTH*.66}
                        width={WIDTH*.66}
                        height={WIDTH*.1}
                        text={reference}
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        align="center"
                        verticalAlign="middle"
                        fontSize={(WIDTH*.66) *.09}
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

CarScratch.displayName = "CarScratch"

export default CarScratch;