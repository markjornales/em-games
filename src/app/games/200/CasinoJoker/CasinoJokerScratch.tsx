import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert';
import Joker from './Joker';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
});

type TCasinoJokerScratch = {
    combination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TCasinoJokerRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const CasinoJokerScratch = React.forwardRef<TCasinoJokerRef, TCasinoJokerScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false); 
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.35;
    const y1 = HEIGHT*.56;
    const x2 = WIDTH*.92;
    const y2 = HEIGHT*.85
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos } = useScratchMethod({
        HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, imageSrc: "/images/200/casinojoker/front.png", 
    });
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

   const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 20});

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

    const handleOnTap = () => {
        setModalshow(false);
    }
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#ececec"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((value, indexColumn) => 
                        <Group 
                            key={indexColumn+ indexRow}
                            opacity={value? 1: 0.3}
                            y={HEIGHT*(.545 + (0.113 * indexRow))} 
                            x={WIDTH*(.39 + (0.28 * indexColumn))}>
                            <Joker
                                dHeight={HEIGHT}
                                dWidth={WIDTH}
                                imageHeight={WIDTH*.17}
                                imageWidth={WIDTH*.23}
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
                <Group x={WIDTH*.853} y={WIDTH*.07}>
                    <Rect   
                        offsetX={WIDTH*.805} 
                        rotation={-90}
                        fill="white"
                        width={WIDTH*.805}
                        height={WIDTH*.092}
                    />
                    <Text 
                        width={WIDTH*.805}
                        height={WIDTH*.092}
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.07}
                        text={reference}
                        rotation={-90} 
                        offsetX={WIDTH*.805}
                        wrap="word"
                        align="center"
                        verticalAlign="middle"
                        x={3}
                    />
                </Group>
            </Group>
            <PopupAlert  
                visible={isModalShow}
                height={height}
                width={width}
                onTap={handleOnTap}
            />
        </Group>
    );
});

CasinoJokerScratch.displayName = "CasinoJokerScratch"

export default CasinoJokerScratch;