import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import GoldBars from './GoldBars';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TThailandBScratch = {
    combination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TThailandBRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const ThailandBScratch = React.forwardRef<TThailandBRef, TThailandBScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.21;
    const y1 = HEIGHT*.53;
    const x2 = WIDTH*.78;
    const y2 = HEIGHT*.83
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/thailandbangkok/front.png"});
    

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
    
    const handleonTap = () => {
        setModalshow(false);
    } 
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((values, indexColumn) => 
                        <Group 
                            opacity={values? 1: 0.3}
                            key={ indexRow + indexColumn} 
                            y={HEIGHT*(.52 + (0.102 * indexRow))} 
                            x={WIDTH*(.21 + (0.188 * indexColumn))}
                        >
                            <GoldBars
                                imageHeight={WIDTH*.2}
                                imageWidth={WIDTH*.2}
                                showGold={values}
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
                <Group x={WIDTH*.186} y={HEIGHT*.918}>
                    <Rect
                        fill="white" 
                        offsetX={WIDTH*.63}
                        offsetY={WIDTH*.12}
                        rotation={180}
                        width={WIDTH*.63}
                        height={WIDTH*.12}
                    />
                    <Text  
                        text={reference}
                        width={WIDTH*.63}
                        height={WIDTH*.12}
                        rotation={180}
                        offsetX={WIDTH*.64}
                        offsetY={WIDTH*.11}
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.06}
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

ThailandBScratch.displayName = "ThailandBScratch"

export default ThailandBScratch;