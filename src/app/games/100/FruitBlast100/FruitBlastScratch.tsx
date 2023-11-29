import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import Fruits from './Fruits';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
type TCombination = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
type TFruitBlastScratchProps = {
    combinations: TCombination[][]
}
type TFruitBlastScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}


const FruitBlastScratch = React.forwardRef<TFruitBlastScratchRef, TFruitBlastScratchProps>((props, ref) => {
    const { combinations = [] } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.16;
    const x2 = WIDTH*.84;
    const y1 = HEIGHT*.58;
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
                        y={HEIGHT*(.572 + (0.07 * indexRow))}
                        x={WIDTH*(.15 + (0.19 * indexColumn))}
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