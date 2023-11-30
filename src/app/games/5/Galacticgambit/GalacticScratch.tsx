import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Galactic from './Galactic';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TGalacticScratch = {
    combination: boolean[][]
  
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TGalacticRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GalacticScratch = React.forwardRef<TGalacticRef, TGalacticScratch>((props, ref) => {
    const { combination , reference, scratchdone, } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.3;
    const y1 = HEIGHT*.47;
    const x2 = WIDTH*.90;
    const y2 = HEIGHT*.79
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/5/galactic/frontnew.png"});
    

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
    
    const handleCombinations = React.useMemo(() => {
        return combination.map((data, indexRow) => 
        data.map((values, indexColumn) => 
        <Group 
            opacity={values ? 1: 0.4}
            x={WIDTH*(.38 + (0.16 * indexColumn)) } 
            y={HEIGHT*(.49 + (0.11 * indexRow))} 
            key={indexRow + indexColumn}>
            <Galactic imageHeight={WIDTH*.1} imageWidth={WIDTH*.1}/>
        </Group>
        )
        )
    },[combination]);

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
                  <Group y={HEIGHT*.9} x={WIDTH*.2}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.8}
                        height={WIDTH*.14}
                    />
                    <Text 
                        text={reference} 
                        width={WIDTH*.8} 
                        height={WIDTH*.15}
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

GalacticScratch.displayName = "GalacticScratch"

export default GalacticScratch;