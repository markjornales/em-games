import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert';  
import SuperBall from './SuperBall';
import useFastScratch from '@/hooks/useFastScratch';
import { superBallFunction } from '@/hooks/cards/superBallClass';

type TSuperBallScratch = {
    combination: ((0|1|2)|undefined)[]
}
type TSuperBallBRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const SuperBallScratch = React.forwardRef<TSuperBallBRef, TSuperBallScratch>((props, ref) => {
    const { combination } = props;
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
        imageSrc: "/images/20/superball/frontnew.png"});
    

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
        superBallFunction(8).map((data,indexRow) => 
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
        ), []);

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

SuperBallScratch.displayName = "SuperBallScratch"

export default SuperBallScratch;