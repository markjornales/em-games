import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import JackSpade from './JackSpade';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TLuckyJackScratch = {
    combination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TLuckyJackRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const LuckyJackScratch = React.forwardRef<TLuckyJackRef, TLuckyJackScratch>((props, ref) => {
    const { combination, scratchdone, reference } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.32;
    const y1 = HEIGHT*.07;
    const x2 = WIDTH*.89;
    const y2 = HEIGHT*.43
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/luckyjack/front.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 19});

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
    
    const handleonTap = () => {
        setModalshow(false);
    } 

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((value, indexColumn) => 
                        <Group 
                            key={indexColumn+ indexRow}
                            opacity={value? 1: 0.2}
                            x={WIDTH*(.34 + (0.28 *indexColumn))} 
                            y={HEIGHT*(.044 + (0.136 * indexRow))}>
                            <JackSpade
                                dHeight={HEIGHT}
                                dWidth={WIDTH}
                                imageHeight={WIDTH*.23}
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
                 <Group x={(WIDTH-WIDTH*.58)/2} y={(HEIGHT*.977)-WIDTH*.1}>
                    <Rect fill="white" width={WIDTH*.67} height={WIDTH*.09}/>
                    <Text
                        width={WIDTH*.68}
                        height={WIDTH*.10}
                        text={reference}
                        align="center"
                        letterSpacing={3}
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.05}
                    />
                </Group>
            </Group>
            <PopupAlert  
                visible={isModalShow}
                height={height}
                width={width}
                onTap={handleonTap}
            />
        </Group>
    );
});

LuckyJackScratch.displayName = "LuckyJackScratch"

export default LuckyJackScratch;