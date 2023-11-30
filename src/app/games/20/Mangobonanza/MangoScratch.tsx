import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Mango from './Mango';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';   //eto
 
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
}); 
type TMangoProps = "apple"|"melon"|"orange"|"grape"|"mango"

type TMangoScratch = {
     combination: (TMangoProps|undefined)[][]  
     reference: string; 
     scratchdone: (done: boolean) => void;  
}
type TMangoRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const MangoScratch = React.forwardRef<TMangoRef, TMangoScratch>((props, ref) => {
    const { combination = [], reference, scratchdone } = props;   
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.22;
    const y1 = HEIGHT*.15;
    const x2 = WIDTH*.85;
    const y2 = HEIGHT*.55
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/20/mango/frontnew.png"});
    

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

    const handleMangobonanza = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => {
            const listletters: TMangoProps[] = ["apple", "melon", "orange", "grape", "mango"];
            const randomLetters = listletters[Math.floor(Math.random() * listletters.length)];
            return <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.21 + (0.2 * indexColumn)) } 
                y={HEIGHT*(.165 + (0.1 * indexRow))} 
                key={indexRow + indexColumn}>
                <Mango imageHeight={WIDTH*.16} assetname={values || randomLetters} imageWidth={WIDTH*.2}/>
            </Group>
            })
        )
    },[combination]);
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleMangobonanza}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                    />    

                  <Group y={HEIGHT*.02} x={WIDTH*.13}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.83}
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

MangoScratch.displayName = "MangoScratch"

export default MangoScratch;