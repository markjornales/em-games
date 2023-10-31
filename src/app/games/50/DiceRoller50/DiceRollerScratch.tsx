import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import DiceImage from './DiceImage';
import PopupAlert from '@/components/PopupAlert';

type TDiceRollerScratchProps = {
    combinations: (number|undefined)[][]
}
type TDiceRollerScratchRef = {}

const DiceRollerScratch = React.forwardRef<TDiceRollerScratchRef, TDiceRollerScratchProps>((props, ref) => {
    const { combinations } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.09;
    const x2 = WIDTH*.75;
    const y1 = HEIGHT*.50;
    const y2 = HEIGHT*.88
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos } = 
    useScratchMethod({
        HEIGHT, WIDTH, x1, y1, 
        scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/50/diceroller/front.png"
    });

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
    const showResults = React.useMemo(() => 
        combinations.map((data, indexRows) => 
            data.map((dicenumber, indexColumn) => 
                <DiceImage 
                    key={indexRows + indexColumn}
                    dwidth={WIDTH}
                    dheight={HEIGHT}
                    imageWidth={WIDTH*.18}
                    imageHeight={WIDTH*.24}
                    y={HEIGHT*(.49 + (0.13 * indexRows))}
                    x={WIDTH*(.113 + (0.223 * indexColumn))}
                    indexDices={dicenumber} 
                /> 
            )
    ),[]);

    return (
    <Group>
        <Group  x={(width- WIDTH)/2} y={(height-height*.78)/2}>
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {showResults}
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
            statusWinner={0}
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

DiceRollerScratch.displayName = "DiceRollerScratch";

export default DiceRollerScratch