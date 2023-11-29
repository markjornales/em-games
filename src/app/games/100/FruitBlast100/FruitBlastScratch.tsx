import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect, Text } from 'react-konva'
import Fruits from './Fruits';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TCombination = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
type TFruitBlastScratchProps = {
    combinations: TCombination[][];
    reference: string;  
    scratchdone: (done: boolean) => void; 
}
type TFruitBlastScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}


const FruitBlastScratch = React.forwardRef<TFruitBlastScratchRef, TFruitBlastScratchProps>((props, ref) => {
    const { combinations = [], reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.14;
    const x2 = WIDTH*.87;
    const y1 = HEIGHT*.59;
    const y2 = HEIGHT*.84;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/100/fruitblast/frontnew.png"});

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


    const combinationFruitBlast = React.useMemo(() => 
        combinations.map((data, indexRow) => 
            data.map((value, indexColumn) => 
                <Fruits
                    key={indexColumn + indexRow}
                    dwidth={WIDTH} 
                    dheight={HEIGHT} 
                    iconHeight={WIDTH*.12}
                    iconWidth={width*.11} 
                    fruitName={value}
                    y={HEIGHT*(.572 + (0.07 * indexRow))}
                    x={WIDTH*(.15 + (0.19 * indexColumn))}
                />
        )
    ),[combinations]);


    return (
    <Group>
        <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="#ececec" width={width*.859} height={HEIGHT*.998}/>
            {canvas && combinationFruitBlast} 
            <Image
                ref={imageRef}
                image={canvas} 
                cornerRadius={10}
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleOnPointerLeave}
            /> 
            <Group y={HEIGHT*.92} x={WIDTH*.23}>
                <Rect
                    stroke="black"
                    strokeWidth={0.9}
                    fill="white"
                    width={WIDTH*.73}
                    height={WIDTH*.09}
                />
                <Text 
                    text={reference}
                    fontFamily={poppins.style.fontFamily}
                    width={WIDTH*.73}
                    height={WIDTH*.09}
                    fontSize={(WIDTH*.73) * .08}
                    align="center"
                    verticalAlign="middle"                    
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

FruitBlastScratch.displayName = "FruitBlastScratch";

export default FruitBlastScratch