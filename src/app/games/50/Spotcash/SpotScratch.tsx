import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Spotcash from './Spotcash';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
type TSpotScratch = {
    combination: boolean[][]
    
    reference: string; 
    scratchdone: (done: boolean) => void;
    
}
type TSpotcashRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const SpotScratch = React.forwardRef<TSpotcashRef, TSpotScratch>((props, ref) => {
    const { combination , reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.27;
    const y1 = HEIGHT*.15;
    const x2 = WIDTH*.90;
    const y2 = HEIGHT*.52
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/50/spotcash/frontnew.png"});
    

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

    const handleShowCash = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.3}
                x={WIDTH*(.32 + (0.22 * indexColumn)) } 
                y={HEIGHT*(.135 + (0.102 * indexRow))} 
                key={indexRow + indexColumn}>
                <Spotcash imageHeight={WIDTH*.15} imageWidth={WIDTH*.1}/>
            </Group>
            )
        )
    }, [combination])
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleShowCash}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                    />   
                 <Group y={HEIGHT*.015} x={WIDTH*.14}>
                    <Rect 
                        fill="white" 
                        width={WIDTH*.835}
                        height={WIDTH*.12}
                    />
                    <Text 
                        y={3}
                        text={reference} 
                        width={WIDTH*.835}
                        height={WIDTH*.12}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={(WIDTH*.835)*.09}
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

SpotScratch.displayName = "SpotScratch"

export default SpotScratch;