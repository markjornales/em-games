import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import Horseasset from './Horseasset';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type THorseScratch  = {
    combination: boolean[][]
    popupwinners: number; 
     reference: string;
     scratchdone: (done: boolean) => void;
}
type THorseScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const HorseScratch = React.forwardRef<THorseScratchRef, THorseScratch>((props, ref) => {
    const { combination, popupwinners , reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.22;
    const y1 = HEIGHT*.66;
    const x2 = WIDTH*.63;
    const y2 = HEIGHT*.945
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/horse/frontnew.png"});
    

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
    
    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((values, indexColumn) =>  
                    <Group 
                        opacity={values ? 1: 0.4}
                        key={indexRow + indexColumn} 
                        y={HEIGHT*(.632 + (0.12 * indexRow))} 
                        x={WIDTH*(.183 + (0.155 * indexColumn))}
                    >
                        <Horseasset
                            imageHeight={WIDTH*.16}
                            imageWidth={WIDTH*.16}
                        />
                    </Group>
                    )
                )}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />  

                 <Group y={HEIGHT*.01} x={WIDTH*.2}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.78}
                        height={WIDTH*.118}
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
                statusWinner={popupwinners}
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

HorseScratch.displayName = "HorseScratch"

export default HorseScratch;