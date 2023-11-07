import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import Fruits from './Fruits';
import PopupAlert from '@/components/PopupAlert';

type TCombination = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
type TFruitBasketScratchProps = {
    combinations: TCombination[][]
}
type TFruitBasketScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}


const FruitBasketScratch = React.forwardRef<TFruitBasketScratchRef, TFruitBasketScratchProps>((props, ref) => {
    const { combinations = [] } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.30;
    const x2 = WIDTH*.86;
    const y1 = HEIGHT*.12;
    const y2 = HEIGHT*.49;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/5/fruitbasket/front.png"});

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
            <Rect cornerRadius={10} fill="#ececec" width={width*.859} height={HEIGHT*.998}/>
            {canvas && combinations.map((data, indexRow) => 
                data.map((value, indexColumn) => 
                    <Fruits
                        key={indexColumn + indexRow}
                        dwidth={WIDTH} 
                        dheight={HEIGHT} 
                        iconHeight={WIDTH*.12}
                        iconWidth={width*.11} 
                        fruitName={value} 
                        y={HEIGHT*(.15 + (0.08 * indexRow))}
                        x={WIDTH*(.3 + (0.14 * indexColumn))}
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

            {/* <Rect 
                fill="red"
                width={x2-x1}
                height={y2-y1}
                x={x1}
                y={y1}
                /> */}
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
    </Group>
  );
});

FruitBasketScratch.displayName = "FruitBasketScratch";

export default FruitBasketScratch