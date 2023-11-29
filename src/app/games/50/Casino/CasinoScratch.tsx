import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Casino from './Casino';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';   //eto

// eto siya dapat ilagay
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
//---

type TCasinoScratch = {
    combination: boolean[][]
     //eto siya dapat ilagay
    
     reference: string; 
     //--/>
     scratchdone: (done: boolean) => void; 
}
type TCasinoRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const CasinoScratch = React.forwardRef<TCasinoRef, TCasinoScratch>((props, ref) => {
    const { combination, reference, scratchdone } = props;   /**eto siya dapat ilagay  ang popupwinners at reference*/
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.27;
    const y1 = HEIGHT*.083;
    const x2 = WIDTH*.835;
    const y2 = HEIGHT*.43
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/50/casino/frontnew.png"});
    

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
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && combination.map((data, indexRow) => 
                    data.map((values, indexColumn) => 
                    <Group 
                        opacity={values ? 1: 0.4}
                        x={WIDTH*(.33 + (0.16 * indexColumn)) } 
                        y={HEIGHT*(.08 + (0.131 * indexRow))} 
                        key={indexRow + indexColumn}>
                        <Casino imageHeight={WIDTH*.16} imageWidth={WIDTH*.13}/>
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

                {/* eto siya dapat ilagay */}
                <Group y={HEIGHT*.92} x={WIDTH*.04}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.83}
                        height={WIDTH*.11}
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
                onTap={() => {
                    setModalshow(false);
                }}
            />
        </Group>
    );
});

CasinoScratch.displayName = "CasinoScratch"

export default CasinoScratch; 