import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Bacarat, { TBaracatName } from './Bacarat';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TBacaratScratch = {
    combination: TBaracatName[][];
    reference: string;  
    scratchdone: (done: boolean) => void; 
}
type TBacaratRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const BacaratScratch = React.forwardRef<TBacaratRef, TBacaratScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.36;
    const y1 = HEIGHT*.04;
    const x2 = WIDTH*.81;
    const y2 = HEIGHT*.45
    
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/50/bacarat/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 20});

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

    const handleBaracatShow = React.useMemo(() => combination.map((data, indexRow) => 
        data.map((values, indexColumn) => 
        <Group 
            opacity={values ? 1: 0.4}
            x={WIDTH*(.39 + (0.22 * indexColumn)) } 
            y={HEIGHT*(.04 + (0.11 * indexRow))} 
            key={indexRow + indexColumn}>
            <Bacarat 
                baracatname={values} 
                imageHeight={WIDTH*.18}
                imageWidth={WIDTH*.2}
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
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleBaracatShow} 
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />  
                <Group x={WIDTH*.85} y={HEIGHT*.02}>
                    <Rect
                        fill="white" 
                        rotation={90}
                        offsetY={WIDTH*.13}
                        width={WIDTH*.79}
                        height={WIDTH*.13}
                    />
                    <Text
                        x={3}
                        rotation={-90}
                        offsetX={WIDTH*.79} 
                        width={WIDTH*.79}
                        height={WIDTH*.13}
                        fontFamily={poppins.style.fontFamily}
                        align="center"
                        verticalAlign="middle"
                        text={reference}
                        fontSize={(WIDTH*.79) *.09}
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

BacaratScratch.displayName = "BacaratScratch"

export default BacaratScratch; 