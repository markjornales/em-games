import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Usa from './Usa';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TUsaScratch = {
    combination: boolean[][];
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TUsaRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const UsaScratch = React.forwardRef<TUsaRef, TUsaScratch>((props, ref) => {
    const { combination , reference , scratchdone } = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.17;
    const y1 = HEIGHT*.14;
    const x2 = WIDTH*.75;
    const y2 = HEIGHT*.46
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/50/usa/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 14});

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

    const handleCombinationUsa = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.17 + (0.2 * indexColumn)) } 
                y={HEIGHT*(.13 + (0.096 * indexRow))} 
                key={indexRow + indexColumn}>
                <Usa imageHeight={WIDTH*.15} imageWidth={WIDTH*.2}/>
            </Group>
            )
        );
    }, [combination])
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleCombinationUsa}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                 <Group y={HEIGHT*.01} x={WIDTH*.22}>
                    <Rect  
                        fill="white"
                        width={WIDTH*.712}
                        height={WIDTH*.1}
                    />
                    <Text 
                        x={2}
                        y={2}
                        text={reference} 
                        width={WIDTH*.712}
                        height={WIDTH*.1}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        fontSize={(WIDTH*.712)*.08}
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

UsaScratch.displayName = "UsaScratch"

export default UsaScratch;