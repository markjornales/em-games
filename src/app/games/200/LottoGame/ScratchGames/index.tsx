import { CanvasProvider } from '@/components/CanvasContext';
import PopupAlert from '@/components/PopupAlert';
import ScratchHere from '@/components/ScratchHere';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Image, Rect, Text, } from "react-konva";
import { WinnerLoseImage } from './AssetLotto';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

export type TStagePos = {
    x: number;
    y: number;
} 
export type gameCombination = [boolean, boolean, boolean, boolean, boolean];

export type TgameCombination = [
    gameCombination, 
    gameCombination, 
    gameCombination, 
    gameCombination
  ];

export type TLottoGames = {
    gameCombination?: TgameCombination;
}

export type TLottoGamesRef = {
    isScratchDone: boolean;
    reset: () => void
}
 
const ScratchGames = React.forwardRef<TLottoGamesRef, TLottoGames>((props, ref) => {
    const {gameCombination = []} = props;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;   
    
    const WIDTH = width*.862;
    const HEIGHT = height*.75; 
    
    const x1 = (WIDTH - WIDTH*.8)/2;
    const x2 = ((WIDTH - WIDTH*.8)/2) + WIDTH*.8
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
    },imageSrc: '/images/200/LottoGame/lottogamesfront.png'});

    const {
        imageRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp, 
        handleOnPointerLeave, 
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
     <Group y={(height-(height*.78))/2} x={(width-width*.86)/2} >  
        <Rect fill="white" width={width*.86} height={height*.75} cornerRadius={10}/>
        {canvas && gameCombination.map((data, index) => {
            const ypos = .097 * index; 
            return data.map((value, indexValue) => {   
                const xpos= .17 * indexValue;
                return (
                    <WinnerLoseImage key={index + indexValue} {...value? {
                            y: 0.545 + ypos,
                            x: 0.11 + xpos,
                            imgWidth: 0.11,
                            imgHeight: 2.252,
                            value,
                            isScratchDone
                        }:{
                            y: 0.545 + ypos,
                            x: (0.28 + xpos)-0.17,
                            imgWidth: 0.32,
                            imgHeight: 2.835,
                            opacity: 0.6,
                            value,
                            isScratchDone
                        }}
                        height={HEIGHT} 
                        width={WIDTH} 
                        src="/images/200/LottoGame/lottogamesfront.png" 
                    /> 
                );
            })
        })}
        <Image
            cornerRadius={10} 
            ref={imageRef}
            image={canvas}
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

        <Group x={(WIDTH-WIDTH*.9)/2} y={(HEIGHT*.994)-WIDTH*.1}>
            <Rect fill="white" width={WIDTH*.9} height={WIDTH*.09}/>
            <Text
                width={WIDTH*.9}
                height={WIDTH*.10}
                text="123-4567-890"
                align="center"
                letterSpacing={3}
                verticalAlign="middle"
                fontFamily={poppins.style.fontFamily}
                fontSize={WIDTH*.07}
            />
        </Group>
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
     <ScratchHere 
        x={(width-width*.6)/2}
        y={(height-height*.2)*.73}
        height={height*.2}
        width={width*.6}
        BHeight={height}
        BWidth={width}
     />
    </Group>
  );
});

ScratchGames.displayName = "ScratchGames";

export default ScratchGames