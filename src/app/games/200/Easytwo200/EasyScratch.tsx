import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Easy from './Easy';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TEasyScratch = {
    combination: {
        winning_number: any[],
        rand_number: any[][]
    };
    reference: string;
    scratchdone: (done: boolean) => void;
}
type TEasyRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const EasyScratch = React.forwardRef<TEasyRef, TEasyScratch>((props, ref) => {
    const { combination, reference , scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.5;
    const y1 = HEIGHT*.12;
    const x2 = WIDTH*.96;
    const y2 = HEIGHT*.62
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/easytwo/front.png"});
    

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

    const EasyYourNumber = React.useCallback(() => {
        return (<>
            { combination.rand_number.map((colVal, rows) => 
                colVal.map((v, cols) => 
                <Group 
                    key={rows+cols}
                    rotation={-90} 
                    offsetX={WIDTH*.14} 
                    x={WIDTH*(.57 + (0.18 * cols))} 
                    y={HEIGHT*(.104 + (0.1 * rows))}>
                    <Easy 
                        goldenfishname={cols == 0? rows %2 == 0? "00": "01": rows %2 ==0 ? "10": "11"}
                        imageHeight={WIDTH*.14}
                        imageWidth={WIDTH*.14}
                    />
                    <Text 
                        y={4}
                        align="center"
                        text={`₱${v[0]}`}
                        fill="white"
                        stroke="black"
                        strokeWidth={0.5}
                        shadowColor="black"
                        shadowBlur={3}
                        shadowOffsetY={1}
                        verticalAlign="middle"
                        width={WIDTH*.14}
                        height={WIDTH*.14}
                        fontFamily={poppins.style.fontFamily}
                        fontSize={(WIDTH*.14) *.3}
                    />
                </Group>
            ))}
        </>)        
    }, [combination.rand_number])

    const WinningNumber = React.useCallback(() => {
        return (<>
        {combination.winning_number.map((v, i) =>
              <Group 
                key={i}
                y={HEIGHT*.49} 
                x={WIDTH*(.55 + (0.19 * i))}  
                rotation={-90} 
                offsetX={WIDTH*.28}
            >
                <Easy 
                    goldenfishname="dragon"
                    imageHeight={WIDTH*.17}
                    imageWidth={WIDTH*.28}
                />
                <Text 
                    y={4}
                    align="center"
                    text={`₱${v[0]}`}
                    fill="white"
                    stroke="black"
                    strokeWidth={0.5}
                    shadowColor="black"
                    shadowBlur={3}
                    shadowOffsetY={1}
                    verticalAlign="middle"
                    width={WIDTH*.28}
                    height={WIDTH*.17}
                    fontFamily={poppins.style.fontFamily}
                    fontSize={(WIDTH*.28) *.3}
                />
            </Group>
        )}
        </>)
    }, [combination.winning_number])


    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && <EasyYourNumber/>}
                {canvas && <WinningNumber/>}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                 <Group y={HEIGHT*.01} x={WIDTH*.18}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.8}
                        height={WIDTH*.12}
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

EasyScratch.displayName = "EasyScratch"

export default EasyScratch;