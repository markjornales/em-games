import { CanvasProvider } from '@/components/CanvasContext';
import React from 'react';
import { Group, Image, Rect, Text, } from "react-konva";
import { Poppins } from 'next/font/google';
import useImage from 'use-image';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import { GifComponents } from '@/components/ImageComponents';
import { animated, Spring } from 'react-spring';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
})

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

const GroupAnimation:any = animated(Group);
 
const ScratchGames = React.forwardRef<TLottoGamesRef, TLottoGames>((props, ref) => {
    const {gameCombination = []} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;   

    const WIDTH = width*.862;
    const HEIGHT = height*.8; 
    
    const x1 = (WIDTH - WIDTH*.8)/2;
    const x2 = ((WIDTH - WIDTH*.8)/2) + WIDTH*.8
    const y1 = (HEIGHT-HEIGHT*.35)*.85
    const y2 = (HEIGHT-HEIGHT*.35)*.85 + HEIGHT*.35 

    const {
        canvas, 
        isScratchDone, 
        setStagePointerPos, 
        setScratchDone
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, imageSrc: '/images/CardFlip.png'});

    const {
        imageRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp, 
        handleOnPointerLeave, 
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});


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
        <Rect fill="white" width={width*.86} height={height*.8} cornerRadius={10}/>
        {gameCombination.map((data, index) => {
            const ypos = .097 * index; 
            return data.map((value, indexValue) => {   
                const xpos= .17 * indexValue;
                return (
                    <WinnerLoseImage key={index + indexValue} {...value? {
                            y: 0.545 + ypos,
                            x: 0.11 + xpos,
                            imgWidth: 0.06,
                            imgHeight: 1.218,
                        }:{
                            y: 0.545 + ypos,
                            x: (0.28 + xpos)-0.17,
                            imgWidth: 0.174,
                            imgHeight: 1.532,
                            opacity: 0.6
                        }}
                        height={HEIGHT} 
                        width={WIDTH} 
                        src="/images/CardFlip.png" 
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
     <Spring
        from={{onstart: true}}
        to={{onstart: false}}
        delay={3000}
     >
        {(props) => 
        <GroupAnimation visible={props.onstart}>
            <Rect 
                width={width} 
                height={height}
                fill="black"
                opacity={0.3}
            />
            <Group x={(width-width*.6)/2} y={(height-height*.2)*.73}>
                <GifComponents
                    src="/images/ScratchhereGRay.gif"
                    height={height*.2}
                    width={width*.6}
                />
            </Group>
        </GroupAnimation>}
     </Spring>
    </Group>
  );
});

type TWinnerLoseImage = {
    width: number;
    height: number;
    src: string;
    imgWidth: number;
    imgHeight: number;
    opacity?: number;
} & TStagePos;

const WinnerLoseImage = (props: TWinnerLoseImage) => {
    const {src, height, width, imgHeight, imgWidth, x, y, opacity = 1} = props;
    const [isCanvasImage, setCanvasImage] = React.useState<HTMLCanvasElement>();
    const [imageElement] = useImage(src);
    
    React.useEffect(() => {
        if(imageElement){
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d")!;
            canvas.width = width;
            canvas.height = height;
            context.beginPath();
            context.drawImage(imageElement, width*imgWidth, width * imgHeight, 100, 100, 0, 0, canvas.width, canvas.height);
            setCanvasImage(canvas);
        }
    },[imageElement]); 

    return (
        <Image 
            cornerRadius={width*.13/2}
            opacity={opacity}
            y={height*y}
            x={width*x}
            width={width*.13}
            height={width*.13}
            image={isCanvasImage}
        />
    );
} 

export default ScratchGames