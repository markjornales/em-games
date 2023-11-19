import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva' 
import ScratchHere from '@/components/ScratchHere';
import PopupAlert from '@/components/PopupAlert';
import { shuffleArrays } from '@/hooks/functions';
import Bingo from './Bingo';
import useFastScratch from '@/hooks/useFastScratch';

type TBingoScratchProps = {
  // combination: boolean[][]
}
type TBingoScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}

// letterB = {x: 0.35, y: 1.26, cornerRadius: 0}
// letterI = {x: 0.35, y: 1.07, cornerRadius: 0}
// letterN = {x: 0.35, y: 0.88, cornerRadius: 0}
// letterG = {x: 0.55, y: 1.185, cornerRadius: 0.1}
// letterO = {x: 0.55, y:0.94, cornerRadius:0.1}

type TCombination = {
  x: number;
  y:number;
  cornerRadius: number;
  selected: boolean;
  letter: "letterB"|"letterI"|"letterN"|"letterG"|"letterO"
}

const combinations: TCombination[] = [
  {x: 0.35, y: 1.26, cornerRadius: 0, selected: false, letter: "letterB"},
  {x: 0.35, y: 1.07, cornerRadius: 0, selected: false, letter: "letterI"},
  {x: 0.35, y: 0.88, cornerRadius: 0, selected: false, letter: "letterN"},
  {x: 0.55, y: 1.185, cornerRadius: 0.1, selected: false, letter: "letterG"},
  {x: 0.55, y:0.94, cornerRadius:0.1, selected: false, letter: "letterO"}
];

const BingoScratch = React.forwardRef<TBingoScratchRef, TBingoScratchProps>((props, ref) => {
    // const {combination} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current; 

    const x1 = WIDTH*.2;
    const x2 = WIDTH*.74;
    const y1 = HEIGHT*.47;
    const y2 = HEIGHT*.82
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/200/bingo/bingofront.png"});

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleOnPointerLeave, imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});
    
    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 20});

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
            setFastScratch(false)
        },
        fastscratch: () => {
            setFastScratch(true) 
        }
    }));

 
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#d4d4d4" width={width*.859} height={HEIGHT*.998}/> 
                {combinations.map((position, index) => 
                  <Group x={(WIDTH*.9)*position.x} y={WIDTH*position.y} key={index}>
                    <Bingo
                      selected={position.selected}
                      key={index}
                      height={HEIGHT}
                      width={WIDTH}
                      imageHeight={WIDTH*.17}
                      imageWidth={WIDTH*.17}
                      bingoletter={position.letter}
                      cornerRadius={WIDTH*position.cornerRadius/2}
                    />
                  </Group>
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
                 
{/* 
                  <Rect 
                fill="red"
                width={x2-x1}
                height={y2-y1}
                x={x1}
                y={y1}
                /> */}
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
            {/* <ScratchHere 
                x={(width-width*.6)/2}
                y={height*.5}
                height={height*.2}
                width={width*.6}
                BHeight={height}
                BWidth={width}
            /> */}
        </Group>
    );
});

BingoScratch.displayName = "BingoScratch";

export default BingoScratch