import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import Banana from './Banana';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TJungleadventureScratch  = {
    combination: boolean[][];
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TJungleadventureScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const JungleadventureScratch = React.forwardRef<TJungleadventureScratchRef, TJungleadventureScratch>((props, ref) => {
    const { combination = [], reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.25;
    const y1 = HEIGHT*.43;
    const x2 = WIDTH*.65;
    const y2 = HEIGHT*.9
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/10/jungleadventure/front.png"});
    

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
    
    const handleCombinations = React.useMemo(() =>{
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) =>  
            <Group 
                opacity={values? 1: 0.3}
                key={indexColumn + indexRow} 
                y={HEIGHT*(.44 + (0.173 * indexRow))} 
                x={WIDTH*(.21 + (0.21 * indexColumn))}>
                <Banana
                    imageHeight={WIDTH*.24} 
                    imageWidth={WIDTH*.21}
                />
            </Group>
            )
        )
    }, [combination])

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleCombinations} 
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />
                <Group x={WIDTH*.165} y={HEIGHT*.02}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.77}
                        height={WIDTH*.085}
                    />
                    <Text
                        y={-2}
                        rotation={-180}
                        offsetX={WIDTH*.77}
                        offsetY={WIDTH*.085}
                        width={WIDTH*.77}
                        height={WIDTH*.085}
                        text={reference}
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        align="center"
                        verticalAlign="middle"
                        fontSize={(WIDTH*.77)*.08}
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

JungleadventureScratch.displayName = "JungleadventureScratch"

export default JungleadventureScratch;