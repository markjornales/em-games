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

const outfit = Poppins({
    subsets: ["latin"],
    weight: "500"
})

const sampledata = [
    [false, false, false],
    [false, false, false],
    [true, false , false]
]

type TGoldenScratch = {

}
type TGoldenRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const GoldenCSCratch = React.forwardRef<TGoldenRef, TGoldenScratch>((props, ref) => {
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
        },
    }));
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.78)/2}>
                <Rect 
                    cornerRadius={10}
                    fill="white"
                    width={width*.859}
                    height={HEIGHT}
                />
                {sampledata.map((column, indexColumn) => 
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
                        // stroke="black"
                        width={WIDTH*.8} 
                        height={WIDTH*.12}
                    />
                    <Text 
                        align="center"
                        text="123-456-789-0" 
                        verticalAlign="middle"
                        width={WIDTH*.8} 
                        height={WIDTH*.11}
                        fontFamily={outfit.style.fontFamily}
                        fontSize={WIDTH*.06}
                    />
                </Group> 
            </Group>
            <PopupAlert 
                statusWinner={1}
                visible={isModalShow}
                height={height}
                width={width}
                onTap={() => {
                    setModalshow(false);
                }}
            />
            <ScratchHere 
                x={(width-width*.6)/2}
                y={(height-height*.2)*.6}
                height={height*.2}
                width={width*.6}
                BHeight={height}
                BWidth={width}
            />
        </Group>
    );
});

GoldenCSCratch.displayName = "GoldenCSCratch"

export default GoldenCSCratch;