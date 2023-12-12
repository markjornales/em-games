import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import Goldencoin, { TCoinname } from './Goldencoin';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TMatchScratch  = {
    combination: TCoinname[][]
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TMatchScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const MatchScratch = React.forwardRef<TMatchScratchRef, TMatchScratch>((props, ref) => {
    const { combination , reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.26;
    const y1 = HEIGHT*.2;
    const x2 = WIDTH*.72;
    const y2 = HEIGHT*.5
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/10/match/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 16});

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
    const handleCombinations = React.useMemo(() => 
         combination.map((data, indexRow) =>{ 
            return data.map((values, indexColumn) =>  {
                return <Group 
                        // opacity={isnull? 1: values? 1: 0.9}
                        key={indexColumn+ indexRow} 
                        x={WIDTH*(.27 + (0.155 *indexColumn))} 
                        y={HEIGHT*(.22 + (0.112 * indexRow))}
                        rotation={-90} 
                        offsetX={WIDTH*.14} 
                    >
                <Goldencoin
                    coinname={values}
                    imageHeight={WIDTH*.145}
                    
                    imageWidth={WIDTH*.145}
                /> 
            </Group>
            })
        })
    , [combination]);
    
    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
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
                 
                <Group y={HEIGHT*.02} x={WIDTH*.15}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.82}
                        height={WIDTH*.135}
                    />
                    <Text 
                        text={reference} 
                        width={WIDTH*.8} 
                        height={WIDTH*.15}
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

MatchScratch.displayName = "MatchScratch"

export default MatchScratch;