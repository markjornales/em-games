import React from "react"; 
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
// import PopupAlert from '@/components/PopupAlert';
// import ScratchHere from '@/components/ScratchHere';
import { CanvasProvider } from '@/components/CanvasContext';
import { Group, Image, Rect, Text } from "react-konva";
// import useImage from "use-image";
import { Poppins } from "next/font/google";
import ScratchHere from "@/components/ScratchHere";
import useImage from "use-image";
import StarDefault from "./StarDefault";
import PopupAlert from "@/components/PopupAlert";
import useFastScratch from '@/hooks/useFastScratch';

const outfit = Poppins({
    subsets: ["latin"],
    weight: "500"
})
 
type TGoldenScratch = {
    combination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TGoldenRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GoldenCSCratch = React.forwardRef<TGoldenRef, TGoldenScratch>((props, ref) => {
    const {combination, reference, scratchdone, } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;
    const x1 = React.useRef<number>(WIDTH*.2).current;
    const y1 = React.useRef<number>(HEIGHT*.49).current;
    const x2 = React.useRef<number>(WIDTH*.78).current;
    const y2 = React.useRef<number>(HEIGHT*.75).current
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/goldencapricorn/front.png"});
    

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
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect 
                    cornerRadius={10}
                    fill="white"
                    width={width*.859}
                    height={HEIGHT}
                />
                {canvas && combination.map((column, indexColumn) => 
                    column.map((row, indexRow) => 
                        <StarDefault 
                            star={row}
                            key={indexColumn + indexRow} 
                            width={WIDTH} 
                            height={HEIGHT}
                            iconHeight={WIDTH*.14}
                            iconWidth={WIDTH*.14}
                            y={HEIGHT*(.47 + (.1* indexColumn))} 
                            x={WIDTH*(.221 + (.204*indexRow))} 
                            isScratchDone={isScratchDone}
                        />
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
                <Group y={(HEIGHT - 10)*.928} x={WIDTH*.1}>
                    <Rect 
                        fill="white"  
                        width={WIDTH*.8} 
                        height={WIDTH*.12}
                    />
                    <Text 
                        align="center"
                        text={reference}
                        verticalAlign="middle"
                        width={WIDTH*.8} 
                        height={WIDTH*.11}
                        fontFamily={outfit.style.fontFamily}
                        fontSize={WIDTH*.06}
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

GoldenCSCratch.displayName = "GoldenCSCratch"

export default GoldenCSCratch;