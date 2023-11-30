import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import { Poppins } from 'next/font/google';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";
import Bali from './Bali';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TBaliScratch = {
    combination: boolean[][];
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TBaliRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const BaliScratch = React.forwardRef<TBaliRef, TBaliScratch>((props, ref) => {
    const { combination = [], reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.27;
    const y1 = HEIGHT*.18;
    const x2 = WIDTH*.75
    const y2 = HEIGHT*.5
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/20/baliindonesia/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 16});

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
    
    const handleBaliindonisia = React.useMemo(() => {
        
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.33 + (0.14 * indexColumn)) } 
                y={HEIGHT*(.144 + (0.099 * indexRow))} 
                key={indexRow + indexColumn}>
                <Bali imageHeight={WIDTH*.16} imageWidth={WIDTH*.13}/>
            </Group>
            )
        )
    }, [combination])

    const handleonTap = () => {
        setModalshow(false);
    }

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleBaliindonisia}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />    
                <Group x={WIDTH*.234} y={HEIGHT*.01}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.73}
                        height={WIDTH*.104}
                    />
                    <Text 
                        y={2}
                        width={WIDTH*.73}
                        height={WIDTH*.104}
                        text={reference}
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        align="center"
                        verticalAlign="middle"
                        fontSize={(WIDTH*.73) *.08}
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

BaliScratch.displayName = "BaliScratch"

export default BaliScratch;