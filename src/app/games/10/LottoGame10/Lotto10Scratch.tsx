import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react';
import { Group, Image, Rect } from 'react-konva';
import PrizeFind from './PrizeFind';

type TLotto10ScratchProps = {
    combinations: boolean[][]
}
type TLotto10ScratchRef = {}

const Lotto10Scratch = React.forwardRef<TLotto10ScratchRef, TLotto10ScratchProps>((props, ref) => {
    const {combinations = []} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.13;
    const x2 = WIDTH*.88;
    const y1 = HEIGHT*.57;
    const y2 = HEIGHT*.90
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/10/lottogame/front.png"});

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
    },[isScratchDone])

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
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {combinations.map((data, indexRow) => 
                data.map((value, indexColumn) => 
                    <PrizeFind
                        dheight={HEIGHT}
                        dwidth={WIDTH}
                        iconHeight={WIDTH*.16}
                        iconWeight={WIDTH*.16}
                        y={WIDTH*(.962 + (0.17 * indexRow))}
                        x={WIDTH*(.09 + (0.17 * indexColumn))}
                        name={value? "pesos": "fire"}
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

export default Lotto10Scratch