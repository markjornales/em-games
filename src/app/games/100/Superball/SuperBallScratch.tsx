import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert';  
import SuperBall from './SuperBall';
import useFastScratch from '@/hooks/useFastScratch';
import { superBallFunction } from '@/hooks/cards/superBallClass';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({
    weight: ["500"],
    subsets: ["latin"],
});

type TSuperBallScratch = {
    combination: number; 
    scratchdone: (done: boolean) => void;
    referenceno: string;
}
type TSuperBallBRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const SuperBallScratch = React.forwardRef<TSuperBallBRef, TSuperBallScratch>((props, ref) => {
    const { combination, referenceno, scratchdone,  } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    
    const x1 = WIDTH*.24;
    const y1 = HEIGHT*.12;
    const x2 = WIDTH*.81;
    const y2 = HEIGHT*.53;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/superball/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 30});

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
    
    const superballShows = React.useMemo(() => 
        superBallFunction(combination).map((data,indexRow) => 
            data.map((colors: any, indexColumn) => 
            <Group 
                key={indexColumn+indexRow}
                y={HEIGHT*(.101 + (0.067 * indexRow))} 
                x={WIDTH*(.24 + (0.112 * indexColumn))} 
                opacity={colors[Object.keys(colors)[0]] == 1? 1: 0.2}>
                <SuperBall
                    ballcolor={Object.keys(colors)[0].toLowerCase()}
                    imageHeight={WIDTH*.1}
                    imageWidth={WIDTH*.1}
                />
            </Group>
            )
        ), [combination]);

    const handleonTap = () => {
        setModalshow(false);
    }

        
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {superballShows} 
                 <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />  
                <Group x={WIDTH*.183} y={WIDTH*.03}> 
                    <Rect 
                        fill="white"
                        width={WIDTH*.796}
                        height={WIDTH*.1}
                    />
                    <Text 
                        fontSize={(WIDTH*.796)*.09}
                        align="center"
                        verticalAlign="middle"
                        width={WIDTH*.796}
                        height={WIDTH*.127}
                        text={referenceno}
                        fontFamily={poppinsFont.style.fontFamily}
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

SuperBallScratch.displayName = "SuperBallScratch"

export default SuperBallScratch;