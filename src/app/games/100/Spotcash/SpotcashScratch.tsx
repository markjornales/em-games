import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva";    
import Spotasset from './Spotasset';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TSpotcashScratch  = {
    combination: boolean[][]
   
     reference: string; 
     scratchdone: (done: boolean) => void; 
}
type TSpotcashScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const SpotcashScratch = React.forwardRef<TSpotcashScratchRef, TSpotcashScratch>((props, ref) => {
    const { combination, reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.24;
    const y1 = HEIGHT*.15;
    const x2 = WIDTH*.91;
    const y2 = HEIGHT*.52
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/100/spotcash/frontnew.png"});
    

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

    const handleonTap = () => {
        setModalshow(false);
    }
    
    return (
        <Group>
            <Group x={(width-WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && combination.map((data, indexRow) => 
                    data.map((values, indexColumn) =>  
                    <Group 
                        opacity={values? 1: 0.2}
                        x={WIDTH*(.27 + (0.21 * indexColumn))} 
                        y={HEIGHT*(.15 + (0.137 * indexRow))} 
                        key={indexRow + indexColumn}>
                        <Spotasset
                            assetname={values? "cash": "bag"}
                            imageHeight={WIDTH*.18}
                            imageWidth={WIDTH*.18}
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
                 <Group y={HEIGHT*.01} x={WIDTH*.14}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.84}
                        height={WIDTH*.13}
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
                onTap={handleonTap}
            />
        </Group>
    );
});

SpotcashScratch.displayName = "SpotcashScratch"

export default SpotcashScratch;