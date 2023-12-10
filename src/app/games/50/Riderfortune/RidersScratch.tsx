import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Riders, { TRadirNameProp } from './Riders';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TRidersScratch = {
    combination: TRadirNameProp[][]
    
    reference: string; 
    scratchdone: (done: boolean) => void; 
}
type TRidersRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const RidersScratch = React.forwardRef<TRidersRef, TRidersScratch>((props, ref) => {
    const { combination , reference, scratchdone} = props; 
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.33;
    const y1 = HEIGHT*.395;
    const x2 = WIDTH*.8;
    const y2 = HEIGHT*.855
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/50/ridersfortune/frontnew.png"});
    

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

    const handleRiderFortune = React.useMemo(() => {
        return combination.map((data, indexRow) => 
            data.map((values, indexColumn) => 
            <Group 
                opacity={values ? 1: 0.4}
                x={WIDTH*(.35 + (0.15 * indexColumn)) } 
                y={HEIGHT*(.37 + (0.13 * indexRow))} 
                key={indexRow + indexColumn}>
                <Riders ridername={values} imageHeight={WIDTH*.17} imageWidth={WIDTH*.16}/>
            </Group>
            )
        )
    }, [combination]);
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#A8A6A8"width={width*.859} height={HEIGHT}/>
                {canvas && handleRiderFortune}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />    
                <Group y={HEIGHT*.02} x={WIDTH*.06}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.9}
                        height={WIDTH*.13}
                    />
                    <Text 
                        x={5}
                        y={3}
                        text={reference} 
                        width={WIDTH*.9} 
                        height={WIDTH*.13}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontStyle={poppins.style.fontStyle}
                        fontSize={(WIDTH*.9)*.09}
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

RidersScratch.displayName = "RidersScratch"

export default RidersScratch; 