import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect, Text } from 'react-konva'
import PrizeFind from './PrizeFind';
import PopupAlert from '@/components/PopupAlert'; 
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TLotto20ScratchProps = {
    combinations: boolean[][]
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TLotto20ScratchRef = {}

const Lotto20Scratch = React.forwardRef<TLotto20ScratchRef, TLotto20ScratchProps>((props, ref) => {
    const {combinations = [], reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.11;
    const x2 = WIDTH*.89;
    const y1 = HEIGHT*.57;
    const y2 = HEIGHT*.88
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/20/lottogame/frontnew.png"});

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 17});

    
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
        
    const lottocombination = React.useMemo(() => 
    combinations.map((data, indexRow) => 
        data.map((value, indexColumn) => 
            <PrizeFind
                key={indexColumn + indexRow}
                dheight={HEIGHT}
                dwidth={WIDTH}
                iconHeight={WIDTH*.13}
                iconWeight={WIDTH*.13}
                y={HEIGHT*(.552 + (0.084 * indexRow))}
                x={WIDTH*(.13 + (0.153 * indexColumn))} 
                name={value? "pesos": "fire"}
            />
        )
    ),[combinations]);

    return (
    <Group>
        <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {canvas && lottocombination}
            <Image
                ref={imageRef}
                image={canvas} 
                cornerRadius={10}
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

Lotto20Scratch.displayName = "Lotto20Scratch"

export default Lotto20Scratch