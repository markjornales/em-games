import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect, Text } from 'react-konva'
import SlotSeven from './SlotSeven';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

export type TCombinations = "dollar"|"seven";
type TLuckySlotsScratchProps = {
    combinations: boolean[][];
    reference: string;  
    scratchdone: (done: boolean) => void; 
}
type TLuckySlotsScratchRef = {}

 

const LuckySlotsScratch = React.forwardRef<TLuckySlotsScratchRef, TLuckySlotsScratchProps>((props, ref) => {
    const { combinations, reference, scratchdone } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

    const x1 = WIDTH*.17;
    const x2 = WIDTH*.83;
    const y1 = HEIGHT*.63;
    const y2 = HEIGHT*.87;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/100/luckyslots/frontnew.png"});

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 10});

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

    const luckyslotcombination = React.useMemo(() => 
        combinations.map((datacombi, indexRow) =>
        datacombi.map((valuecombi, indexColumn) => 
        <Group 
            opacity={!valuecombi ? 0.3: 1}
            y={HEIGHT*(.596 + (0.076 * indexRow))} 
            x={WIDTH*(.13 + (0.185 * indexColumn))} 
            key={indexRow + indexColumn}>
            <SlotSeven
                width={WIDTH}
                height={HEIGHT}
                slotsname={valuecombi? "seven": "dollar"}
                slotHeight={WIDTH*.14}
                slotWidth={WIDTH*.14}
            />
        </Group>
        )
    ),[combinations]); 

    return (
    <Group>
        <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="#e7e1c8" width={width*.859} height={HEIGHT*.998}/>
            {canvas && luckyslotcombination}
            <Image
                ref={imageRef}
                image={canvas} 
                cornerRadius={10}
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleOnPointerLeave}
            />  
            <Group x={WIDTH*.23} y={HEIGHT*.943}>
                <Rect
                    fill="white"
                    width={WIDTH*.73}
                    height={WIDTH*.065}
                />
                <Text
                    y={2}
                    width={WIDTH*.73}
                    height={WIDTH*.065}
                    text={reference}
                    fontFamily={poppins.style.fontFamily}
                    align="center"
                    verticalAlign="middle"
                    fontSize={(WIDTH*.73) *.075}
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

LuckySlotsScratch.displayName = "LuckySlotsScratch"

export default LuckySlotsScratch