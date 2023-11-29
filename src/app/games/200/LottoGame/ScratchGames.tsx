import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import ScratchHere from '@/components/ScratchHere';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Image, Rect, Text, } from "react-konva"; 
import useFastScratch from '@/hooks/useFastScratch';
import WinnerLoseImage from './AssetLotto';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

export type TStagePos = {
    x: number;
    y: number;
} 
 
export type TLottoGames = {
    gameCombination: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}

export type TLottoGamesRef = {
    isScratchDone: boolean;
    reset: () => void
}
 
const ScratchGames = React.forwardRef<TLottoGamesRef, TLottoGames>((props, ref) => {
    const {gameCombination, reference, scratchdone,} = props;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;   
    
    const WIDTH = width*.862;
    const HEIGHT = height*.75; 
    
    const x1 = (WIDTH - WIDTH*.75)/2;
    const x2 = ((WIDTH - WIDTH*.8)/2) + WIDTH*.866
    const y1 = (HEIGHT-HEIGHT*.35)*.85
    const y2 = (HEIGHT-HEIGHT*.35)*.85 + HEIGHT*.35 

    const { 
        canvas, 
        isScratchDone, 
        setStagePointerPos, 
        setScratchDone
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {
        height: HEIGHT*.35,
        width: WIDTH*.8
    }, imageSrc: '/images/200/LottoGame/lottogamesfront.png', });

    const {
        imageRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp, 
        handleOnPointerLeave, 
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos,});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 30});
    
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
     <Group y={(height-(height*.8))/2} x={(width-width*.86)/2} >  
        <Rect fill="white" width={width*.86} height={height*.75} cornerRadius={10}/>
        {canvas && gameCombination.map((data, index) => 
            data.map((value, indexValue) => 
                <Group key={index + indexValue} 
                    y={HEIGHT*(.536 + (0.096* index))} 
                    x={WIDTH*(.09 + (0.17* indexValue))}>
                    <WinnerLoseImage 
                        size={WIDTH}
                        isScratchDone={isScratchDone}
                        value={value}   
                    /> 
                </Group>
            )
        )}
        <Image
            cornerRadius={10} 
            ref={imageRef}
            image={canvas}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleOnPointerLeave}
        />   
        <Group x={(WIDTH-WIDTH*.9)/2} y={(HEIGHT*.994)-WIDTH*.1}>
            <Rect fill="white" width={WIDTH*.9} height={WIDTH*.09}/>
            <Text
                width={WIDTH*.9}
                height={WIDTH*.10}
                text={reference}
                align="center"
                letterSpacing={3}
                verticalAlign="middle"
                fontFamily={poppins.style.fontFamily}
                fontSize={WIDTH*.07}
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

ScratchGames.displayName = "ScratchGames";

export default ScratchGames