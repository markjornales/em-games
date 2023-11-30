import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Bingo from './Bingo';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
});

type TBingoScratch = {
    combination:  ("b"|"i"|"n"|"g"|"o")[][]; 
    scratchdone: (done: boolean) => void;
    referenceno: string;
}
type TBingoRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const BingoScratch = React.forwardRef<TBingoRef, TBingoScratch>((props, ref) => {
    const { combination, referenceno, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.35;
    const y1 = HEIGHT*.06;
    const x2 = WIDTH*.9;
    const y2 = HEIGHT*.4
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/20/bingo/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 15});

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
    
    const handlebingoShows = React.useMemo(() => {
        return combination.map((data, indexRow) => 
        data.map((values, indexColumn) => {
            const listletters = ["b", "i", "n", "g", "o"];
            const randomLetters = listletters[Math.floor(Math.random() * listletters.length)];
            return <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.36 + (0.18 * indexColumn)) } 
                y={HEIGHT*(.1 + (0.15 * indexRow))} 
                key={indexRow + indexColumn}>
                <Bingo imageHeight={WIDTH*.19} assetname={values || randomLetters} imageWidth={WIDTH*.16}/>
            </Group>
        })
    );
    }, [combination]);

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handlebingoShows}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                /> 
                <Group x={WIDTH*.2} y={HEIGHT*.917}>
                    <Rect
                        fill="white"
                        width={WIDTH*.745}
                        height={WIDTH*.115}
                    />
                    <Text   
                        y={-2}
                        offsetX={WIDTH*.745}
                        offsetY={WIDTH*.115}
                        rotation={180}
                        width={WIDTH*.745}
                        height={WIDTH*.115}
                        text={referenceno}
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        align="center"
                        verticalAlign="middle"
                        fontSize={(WIDTH*.745)*.08}
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

BingoScratch.displayName = "BingoScratch"

export default BingoScratch;