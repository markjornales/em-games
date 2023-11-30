import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Treasure from './Treasure';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TTreasureScratch = {
    combination: boolean[][];
    reference: string; 
    scratchdone: (done: boolean) => void; 
}
type TTreasureRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const TreasureScratch = React.forwardRef<TTreasureRef, TTreasureScratch>((props, ref) => {
    const { combination , reference , scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.25;
    const y1 = HEIGHT*.09;
    const x2 = WIDTH*.7;
    const y2 = HEIGHT*.38
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/5/treasure/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 17});

    React.useEffect(() => {
        if(isScratchDone){ 
            setModalshow(true);
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
    
    const handlecombinations = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.28 + (0.15 * indexColumn)) } 
                y={HEIGHT*(.09 + (0.1 * indexRow))} 
                key={indexRow + indexColumn}>
                <Treasure imageHeight={WIDTH*.15} imageWidth={WIDTH*.1}/>
            </Group>
            )
        )
    },[combination])

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                { canvas && handlecombinations }
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />  
                <Group x={WIDTH*.88} y={HEIGHT*.475}>
                    <Rect 
                        rotation={90}
                        offsetY={WIDTH*.08}
                        fill="white" 
                        width={WIDTH*.64}
                        height={WIDTH*.08}
                    />
                    <Text 
                        x={2}
                        rotation={-90}
                        offsetX={WIDTH*.64}
                        text={reference}
                        width={WIDTH*.64}
                        height={WIDTH*.08}
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        fontSize={(WIDTH*.64)*.09}
                        align="center"
                        verticalAlign="middle"  
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

TreasureScratch.displayName = "TreasureScratch"

export default TreasureScratch;