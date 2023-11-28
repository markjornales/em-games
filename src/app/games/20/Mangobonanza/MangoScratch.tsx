import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Mango from './Mango';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';   //eto

// eto siya dapat ilagay
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});
//---

type TMangoScratch = {
    combination: boolean[][]
     //eto siya dapat ilagay
     popupwinners: number; 
     reference: string; 
     scratchdone: (done: boolean) => void; 
     //--/>
}
type TMangoRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const MangoScratch = React.forwardRef<TMangoRef, TMangoScratch>((props, ref) => {
    const { combination, popupwinners , reference, scratchdone } = props;   /**eto siya dapat ilagay  ang popupwinners at reference*/
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
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>

                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((data, indexRow) => 
                    data.map((values, indexColumn) => 
                    <Group 
                        opacity={values ? 1: 0.4}
                        x={WIDTH*(.25 + (0.19 * indexColumn)) } 
                        y={HEIGHT*(.15 + (0.15 * indexRow))} 
                        key={indexRow + indexColumn}>
                        <Mango imageHeight={WIDTH*.16} assetname='mango' imageWidth={WIDTH*.18}/>
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
                
               



                {/* <Rect 
                fill="red"
                width={x2-x1}
                height={y2-y1}
                x={x1}
                y={y1}
                /> */}


                  {/* eto siya dapat ilagay */}
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
            {/*----/> */}



            </Group>
            <PopupAlert 
                statusWinner={popupwinners}
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