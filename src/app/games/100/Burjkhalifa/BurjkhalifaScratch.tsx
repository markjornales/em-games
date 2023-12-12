import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import Burjkhalifaasset, { TBurjname } from './Burjkhalifaasset';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';   //eto

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TBurjkhalifaScratch  = {
    combination: TBurjname[][];
    reference: string;  
    scratchdone: (done: boolean) => void; 
}
type TBurjkhalifaScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const BurjkhalifaScratch = React.forwardRef<TBurjkhalifaScratchRef, TBurjkhalifaScratch>((props, ref) => {
    const { combination, reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.25;
    const y1 = HEIGHT*.19;
    const x2 = WIDTH*.75;
    const y2 = HEIGHT*.56
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/burjkhalifa/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos}); 
    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 15});

    React.useEffect(() => {
        if(  isScratchDone){ 
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

    const BurjComponents = React.useCallback(() => <>
        {combination.map((data, indexRow) => 
                data.map((values, indexColumn) =>  
                <Group 
                    opacity={values? 1: 0.4}
                    y={HEIGHT*(.185 + (0.126 * indexRow))}
                    x={WIDTH*(.24 + (0.168 * indexColumn))} 
                    key={indexRow + indexColumn}>
                    <Burjkhalifaasset
                        burjname={values}
                        imageHeight={WIDTH*.23}
                        imageWidth={WIDTH*.18}
                    />
                </Group>
                )
        )}
    </>,[combination])
    
    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && <BurjComponents/>}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />  
                
                 <Group y={HEIGHT*.02} x={WIDTH*.2}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.78}
                        height={WIDTH*.12}
                    />
                    <Text 
                        text={reference} 
                        width={WIDTH*.8} 
                        height={WIDTH*.12}
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

BurjkhalifaScratch.displayName = "BurjkhalifaScratch"

export default BurjkhalifaScratch;