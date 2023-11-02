import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect } from "react-konva";
import Horses from './Horses';
import PopupAlert from '@/components/PopupAlert';


type TGollapScratch = {
    combination: boolean[][]
}
type TGollapRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GollapScratch = React.forwardRef<TGollapRef, TGollapScratch>((props, ref) => {
    const { combination } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.25;
    const y1 = HEIGHT*.17;
    const x2 = WIDTH*.75;
    const y2 = HEIGHT*.48
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/gollapglory/front.png"});
    

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
                <Rect cornerRadius={10} fill="#dcdad1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((values, indexColumn) => 
                        <Group 
                            opacity={values? 1: 0.3}
                            key={indexRow + indexColumn} 
                            x={WIDTH*(.242 + (0.19 * indexColumn))} 
                            y={WIDTH*(.3 + (0.21 * indexRow))}>
                            <Horses 
                                dHeight={HEIGHT}
                                dWidth={WIDTH}
                                imageHeight={WIDTH*.14}
                                imageWidth={WIDTH*.14}
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

GollapScratch.displayName = "GollapScratch"

export default GollapScratch;