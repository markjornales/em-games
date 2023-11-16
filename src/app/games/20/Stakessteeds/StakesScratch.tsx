import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Stakes from './Stakes';
import useFastScratch from '@/hooks/useFastScratch';

type TStakesScratch = {
    combination: boolean[][]
}
type TStakesRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const StakesScratch = React.forwardRef<TStakesRef, TStakesScratch>((props, ref) => {
    const { combination } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.37;
    const y1 = HEIGHT*.12;
    const x2 = WIDTH*.90;
    const y2 = HEIGHT*.5
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/20/stakesandsteeds/front.png"});
    

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
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((values, indexColumn) => 
                    <Group 
                        opacity={values ? 1: 0.4}
                        x={WIDTH*(.43 + (0.16 * indexColumn)) } 
                        y={HEIGHT*(.12 + (0.131 * indexRow))} 
                        key={indexRow + indexColumn}>
                        <Stakes imageHeight={WIDTH*.16} imageWidth={WIDTH*.13}/>
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
                
                
                
                {/* <Rect 
                fill="red"
                width={x2-x1}
                height={y2-y1}
                x={x1}
                y={y1}
                /> */}

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

StakesScratch.displayName = "StakesScratch"

export default StakesScratch; 