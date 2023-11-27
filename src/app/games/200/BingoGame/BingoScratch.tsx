import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
// import ScratchHere from '@/components/ScratchHere'; 
import { TCombination } from '@/hooks/functions';
import useFastScratch from '@/hooks/useFastScratch';
import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';
import Bingo from './Bingo';
const PopupAlert = dynamic(() => import("@/components/PopupAlert"));
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TBingoScratchProps = {
  combination: TCombination[];
  popupwinners: number;
  reference: string;
  scratchdone: (done: boolean) => void; 
}
type TBingoScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}

const BingoScratch = React.forwardRef<TBingoScratchRef, TBingoScratchProps>((props, ref) => {
    const {combination, popupwinners, reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current; 

    const x1 = WIDTH*.17;
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
            scratchdone(true);
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
                {combination.map((position, index) => 
                  <Group x={WIDTH*position.x} y={WIDTH*position.y} key={index}>
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
                 <Group y={HEIGHT*.912} x={WIDTH*.17}>
                    <Rect
                        fill="white" 
                        width={WIDTH*.78}
                        height={WIDTH*.13}
                    />
                    <Text   
                        offsetX={WIDTH*.78}
                        offsetY={WIDTH*.12}
                        rotationDeg={180}
                        text={reference} 
                        width={WIDTH*.78}
                        height={WIDTH*.13}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={WIDTH*.06}
                    />
                </Group> 
            </Group>
            <PopupAlert 
                statusWinner={popupwinners}
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

BingoScratch.displayName = "BingoScratch";

export default BingoScratch