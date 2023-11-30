import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect, Text} from 'react-konva'
import Fruits from './Fruits';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';

type TCombination = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
type TFruitBasketScratchProps = {
    combinations: TCombination[][];
    reference: string; 
     scratchdone: (done: boolean) => void;  
}
type TFruitBasketScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}


const FruitBasketScratch = React.forwardRef<TFruitBasketScratchRef, TFruitBasketScratchProps>((props, ref) => {
    const { combinations = [], reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;

    const x1 = WIDTH*.28;
    const x2 = WIDTH*.84;
    const y1 = HEIGHT*.16;
    const y2 = HEIGHT*.45;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/5/fruitbasket/frontnew.png"});

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

    const handleCombinations = React.useMemo(() => {
        return combinations.map((data, indexRow) => 
            data.map((value, indexColumn) => 
                <Group  
                    offsetX={WIDTH*.12}
                    key={indexColumn + indexRow}
                    y={HEIGHT*(.15 + (0.08 * indexRow))}
                    x={WIDTH*(.3 + (0.14 * indexColumn))}
                    rotation={-90} >
                    <Fruits
                        dwidth={WIDTH} 
                        dheight={HEIGHT} 
                        iconHeight={WIDTH*.12}
                        iconWidth={width*.11} 
                        fruitName={value} 
                    />
                </Group>
            )
        )
    },[combinations]);


    return (
    <Group>
        <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="#ececec" width={width*.859} height={HEIGHT*.998}/>
            {canvas && handleCombinations}
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

FruitBasketScratch.displayName = "FruitBasketScratch";

export default FruitBasketScratch