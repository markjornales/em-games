import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert';
import Joker from './Joker';


type TCasinoJokerScratch = {
    combination: boolean[][]
}
type TCasinoJokerRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const CasinoJokerScratch = React.forwardRef<TCasinoJokerRef, TCasinoJokerScratch>((props, ref) => {
    const { combination } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.4;
    const y1 = HEIGHT*.56;
    const x2 = WIDTH*.88;
    const y2 = HEIGHT*.86
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/casinojoker/front.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

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
        },
    }));
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.78)/2}>
                <Rect cornerRadius={10} fill="#ececec"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((value, indexColumn) => 
                        <Group 
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
            </Group>
            <PopupAlert 
                statusWinner={0}
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

CasinoJokerScratch.displayName = "CasinoJokerScratch"

export default CasinoJokerScratch;