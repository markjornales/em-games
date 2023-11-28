import { CanvasProvider } from '@/components/CanvasContext';
import ScratchHere from '@/components/ScratchHere';
import useFastScratch from '@/hooks/useFastScratch';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import dynamic from 'next/dynamic';
import React from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
import Rabbits from './Rabbits';
import { Poppins } from 'next/font/google';

const PopupAlert = dynamic(() => import("@/components/PopupAlert"));
const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
});
type TFortuneScratchProps = {
  combination: boolean[][]
  popupwinners: number;
  reference: string;
  scratchdone: (done: boolean) => void; //declare
}
type TFortuneScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}

const FortuneScratch = React.forwardRef<TFortuneScratchRef, TFortuneScratchProps>((props, ref) => {
    const {combination, popupwinners, reference, scratchdone /*declare*/, } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;
    const [isReset, setReset] = React.useState<boolean>(false);
 
    const x1 = WIDTH*.23;
    const x2 = WIDTH*.92;
    const y1 = HEIGHT*.55;
    const y2 = HEIGHT*.8
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/200/fortunerabbit/front.png"});

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleOnPointerLeave, imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 18});
    
    React.useEffect(() => {
        if(isScratchDone){ 
            setModalshow(true);
            scratchdone(true);/*declare*/
        }
    },[isScratchDone])

    React.useImperativeHandle(ref, () => ({
        isScratchDone,
        reset: () => { 
            setScratchDone(false);
            setStagePointerPos([]);
            setReset(init => !init);
            setFastScratch(false)
        },
        fastscratch: () => {
            setFastScratch(true) 
        }
    }));

    const ShowRabbits = React.useMemo(() => 
        combination.map((data, indexColumn) => 
        data.map((rabit, indexRow) => 
            <Rabbits 
                show={rabit}
                key={indexColumn + indexRow}
                x={WIDTH*(0.234  + (.23 * indexColumn))}
                y={HEIGHT*(.51 + (.1 * indexRow))}
                heigth={HEIGHT} 
                width={WIDTH}
            />
        )
    ),[combination])

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#ececec" width={width*.859} height={HEIGHT*.998}/>
                {canvas && ShowRabbits}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                <Group x={WIDTH*.03} y={HEIGHT*.468}>
                    <Rect 
                        fill="white"
                        offsetY={WIDTH*.09}
                        rotationDeg={90} 
                        width={WIDTH*.72}
                        height={WIDTH*.09}
                    />
                    <Text
                        fontSize={WIDTH*.062}
                        rotationDeg={90} 
                        offsetY={WIDTH*.085}
                        fontFamily={poppins.style.fontFamily}
                        width={WIDTH*.72}
                        height={WIDTH*.09}
                        text={reference}
                        align="center"
                        verticalAlign="middle"
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
            <ScratchHere 
                x={(width-width*.48)/2}
                y={height*.5}
                height={height*.2}
                width={width*.6}
                BHeight={height}
                BWidth={width}
            />
        </Group>
    );
});

FortuneScratch.displayName = "FortuneScratch";

export default FortuneScratch