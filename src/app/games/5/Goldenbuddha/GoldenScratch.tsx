import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Golden from './Golden';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TGoldenScratch = {
    combination: boolean[][]
    
    reference: string; 
    scratchdone: (done: boolean) => void; 
}
type TGoldenRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GoldenScratch = React.forwardRef<TGoldenRef, TGoldenScratch>((props, ref) => {
    const { combination , reference, scratchdone, } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.32;
    const y1 = HEIGHT*.07;
    const x2 = WIDTH*.7;
    const y2 = HEIGHT*.47
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/5/goldenbuddha/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 18});


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
    
    const handlecombinations = React.useMemo(() => {
        return combination.map((data, indexRow) => 
        data.map((values, indexColumn) => 
        <Group 
            opacity={values ? 1: 0.4}
            x={WIDTH*(.34 + (0.17 * indexColumn)) } 
            y={HEIGHT*(.07 + (0.11 * indexRow))} 
            key={indexRow + indexColumn}>
            <Golden imageHeight={WIDTH*.14} imageWidth={WIDTH*.14}/>
        </Group>
        )
    )
    }, [combination]);

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handlecombinations}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                 <Group y={HEIGHT*.93} x={WIDTH*.24}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.75}
                        height={WIDTH*.10}
                    />
                    <Text
                        text={reference} 
                        width={WIDTH*.8} 
                        height={WIDTH*.12}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.06}
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

GoldenScratch.displayName = "GoldenScratch"

export default GoldenScratch;