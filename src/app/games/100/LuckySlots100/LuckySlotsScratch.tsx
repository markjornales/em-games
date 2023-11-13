import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import SlotSeven from './SlotSeven';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';

export type TCombinations = "dollar"|"seven";
type TLuckySlotsScratchProps = {
    combinations: TCombinations[][]
}
type TLuckySlotsScratchRef = {}



const LuckySlotsScratch = React.forwardRef<TLuckySlotsScratchRef, TLuckySlotsScratchProps>((props, ref) => {
    const { combinations } = props;
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
        imageSrc: "/images/100/luckyslots/front.png"});

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
        <Group x={(width- WIDTH)/2} y={(height-height*.78)/2}>
            <Rect cornerRadius={10} fill="#e7e1c8" width={width*.859} height={HEIGHT*.998}/>
            {combinations.map((datacombi, indexRow) =>
                datacombi.map((valuecombi, indexColumn) => 
                <Group 
                    opacity={valuecombi == "dollar" ? 0.3: 1}
                    y={HEIGHT*(.596 + (0.076 * indexRow))} 
                    x={WIDTH*(.13 + (0.185 * indexColumn))} 
                    key={indexRow + indexColumn}>
                    <SlotSeven
                        width={WIDTH}
                        height={HEIGHT}
                        slotsname={valuecombi}
                        slotHeight={WIDTH*.14}
                        slotWidth={WIDTH*.14}
                    />
                </Group>
                )
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
        </Group>
        <PopupAlert 
            statusWinner={2}
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