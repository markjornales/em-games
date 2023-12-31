import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import Pockerasset, { PockerNoRender, TPockernames } from './Pockerasset';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
});

type TPockerScratch  = {
    combination:  (TPockernames|undefined)[][]
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TPockerScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const PockerScratch = React.forwardRef<TPockerScratchRef, TPockerScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.3;
    const y1 = HEIGHT*.5;
    const x2 = WIDTH*.89;
    const y2 = HEIGHT*.82
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/pocker/frontnew.png"});
    

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

    const pockerGrids = React.useMemo(() => combination.map((data, indexRow) => 
        data.map((values, indexColumn) =>  
        <Group 
            key={indexRow + indexColumn} 
            x={WIDTH*(.31 + (0.32 * indexColumn))} 
            y={HEIGHT*(.488 + (0.123* indexRow))}
            opacity={values? 1: 0.3}
            >
            {values? 
                <Pockerasset
                    imageHeight={WIDTH*.17}
                    imageWidth={WIDTH*.238}
                    pockername={values}
                />
                :<PockerNoRender
                    imageHeight={WIDTH*.17}
                    imageWidth={WIDTH*.238}
                />
            }
        </Group>
        )
    ),[combination]);
    
    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/> 
                 {canvas && pockerGrids} 
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />
                <Group x={WIDTH*.2} y={HEIGHT*.92}>
                    <Rect
                        offsetX={WIDTH*.67}
                        offsetY={WIDTH*.09}  
                        rotation={180}
                        fill="white"
                        width={WIDTH*.67}
                        height={WIDTH*.09}
                    />
                    <Text
                        y={-2}
                        offsetX={WIDTH*.67}
                        offsetY={WIDTH*.09}
                        rotation={180}
                        align="center"
                        verticalAlign="middle"
                        text={reference}
                        width={WIDTH*.67}
                        height={WIDTH*.09}
                        fontSize={(WIDTH*.67) *.1}
                        fontFamily={poppins.style.fontFamily}
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

PockerScratch.displayName = "PockerScratch"

export default PockerScratch;