import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
import DiceImage, { TDicename } from './DiceImage';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TDiceRollerScratchProps = {
    combinations:  TDicename[][];
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TDiceRollerScratchRef = {}

const DiceRollerScratch = React.forwardRef<TDiceRollerScratchRef, TDiceRollerScratchProps>((props, ref) => {
    const { combinations, reference, scratchdone, } = props;
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
        imageSrc: "/images/50/diceroller/frontnew.png"
    });

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 20});

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
    const ShowResults = React.useCallback(() => <>{
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
                    diceName={dicenumber}
                /> 
            )
    )}</> 
    ,[combinations]);

    return (
    <Group>
        <Group  x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {canvas && <ShowResults/>}
            <Image
                ref={imageRef}
                image={canvas} 
                cornerRadius={10}
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleOnPointerLeave}
            />  
            <Group x={WIDTH*.87} y={HEIGHT*.47}>
                <Rect 
                    fill="white" 
                    rotation={90}
                    offsetY={WIDTH*.08}
                    width={WIDTH*.692}
                    height={WIDTH*.08}
                />
                <Text
                    x={-2}
                    text={reference}
                    width={WIDTH*.692}
                    height={WIDTH*.08}
                    fontFamily={poppins.style.fontFamily}
                    fontStyle={poppins.style.fontStyle}
                    fontSize={(WIDTH*.692) * .08}
                    align="center"
                    verticalAlign="middle"
                    rotation={90}
                    offsetY={WIDTH*.08}   
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

DiceRollerScratch.displayName = "DiceRollerScratch";

export default DiceRollerScratch