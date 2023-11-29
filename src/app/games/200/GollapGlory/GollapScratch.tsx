import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import Horses from './Horses';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
});

type TGollapScratch = {
    combination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TGollapRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GollapScratch = React.forwardRef<TGollapRef, TGollapScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.25;
    const y1 = HEIGHT*.17;
    const x2 = WIDTH*.75;
    const y2 = HEIGHT*.47
    
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

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 17});

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
    
    const gloryhorses = React.useMemo(() => 
        combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
                <Group 
                    opacity={values? 1: 0.3}
                    key={indexRow + indexColumn} 
                    x={WIDTH*(.24 + (0.19 * indexColumn))} 
                    y={HEIGHT*(.167 + (0.118 * indexRow))}>
                    <Horses 
                        dHeight={HEIGHT}
                        dWidth={WIDTH}
                        imageHeight={WIDTH*.14}
                        imageWidth={WIDTH*.14}
                    />
                </Group>
            )
        ),[combination]);

    const handleonTap = () => {
        setModalshow(false);
    } 
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#dcdad1"width={width*.859} height={HEIGHT}/>
                {canvas && gloryhorses}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                    /> 
                <Group x={WIDTH*.19} y={WIDTH*.024}>
                    <Rect 
                        fill="white" 
                        width={WIDTH*.75}
                        height={WIDTH*.12}
                    />
                    <Text 
                        y={2}
                        width={WIDTH*.75}
                        height={WIDTH*.12}
                        text={reference}
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.07}
                        align="center"
                        verticalAlign="middle"
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

GollapScratch.displayName = "GollapScratch"

export default GollapScratch;