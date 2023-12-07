import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect, Text } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert'; 
import Stakes, { TStakesname } from './Stakes';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google'; 

const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
});

type TStakesScratch = {
    combination: TStakesname[][];
    reference: string; 
    scratchdone: (done: boolean) => void;
}
type TStakesRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const StakesScratch = React.forwardRef<TStakesRef, TStakesScratch>((props, ref) => {
    const { combination, reference , scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.36;
    const y1 = HEIGHT*.12;
    const x2 = WIDTH*.935;
    const y2 = HEIGHT*.45
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/20/stakesandsteeds/frontnew.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 18});

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

    const handleCombinationStakes = React.useMemo(() => {
        return combination.map((data, indexRow) => 
        data.map((values, indexColumn) => 
        <Group 
            opacity={values ? 1: 0.4}
            x={WIDTH*(.38 + (0.14 * indexColumn)) } 
            y={HEIGHT*(.14 + (0.11 * indexRow))} 
            key={indexRow + indexColumn}>
            <Stakes stakesname={values} imageHeight={WIDTH*.18} imageWidth={WIDTH*.15}/>
        </Group>
        )
    )
    },[combination]);
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {canvas && handleCombinationStakes}
                <Image
                    ref={imageRef}
                    image={canvas} 
                    cornerRadius={10}
                    onPointerDown={handleMouseDown}
                    onPointerUp={handleMouseUp}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleOnPointerLeave}
                />   
                <Group y={HEIGHT*.9} x={WIDTH*.03}>
                    <Rect 
                        fill="white"
                        width={WIDTH*.95}
                        height={WIDTH*.14}
                    />
                    <Text 
                        text={reference} 
                        width={WIDTH*.9} 
                        height={WIDTH*.15}
                        align="center"
                        verticalAlign="middle"
                        fontFamily={poppins.style.fontFamily}
                        fontSize={(WIDTH*.9) * .08}
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

StakesScratch.displayName = "StakesScratch"

export default StakesScratch; 