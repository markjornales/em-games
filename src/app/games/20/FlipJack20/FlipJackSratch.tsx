import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect, Text } from 'react-konva'
import JackImage from './JackImage';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';
import { Poppins } from 'next/font/google';

export type TCombination = "jack"

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"]
})

type TFlipJackScratchProps = {
    combinations: boolean[][];
    scratchdone: (done: boolean) => void; 
    reference: string;
}
type TFlipJackScratchRef = {
}

const FlipJackScratch = React.forwardRef<TFlipJackScratchRef, TFlipJackScratchProps>((props, ref) => {
    const { combinations, reference, scratchdone} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;

    const x1 = WIDTH*.15;
    const x2 = WIDTH*.87;
    const y1 = HEIGHT*.54;
    const y2 = HEIGHT*.89
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
        setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/20/flipjack/frontnew.png"});

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

    const { setFastScratch } = useFastScratch({setStagePointerPos, positions: {x1, x2, y1, y2}, speed: 16});

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

    const handleCombinations = React.useMemo(() => {
        return combinations.map((dataArray, indexRow) => 
        dataArray.map((jack, indexColumn) => 
            <JackImage
                key={indexRow + indexColumn}
                value={jack? "jack": undefined}
                dwidth={WIDTH}
                dheight={HEIGHT}
                imageWidth={WIDTH*.18}
                imageHeight={WIDTH*.27}
                x={WIDTH*(.148 + (0.256 * indexColumn))}
                y={HEIGHT*(.53 + (0.19 * indexRow))}
            />
        
        )
    )
    }, [combinations]);
        
    return (
    <Group>
        <Group  x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {canvas && handleCombinations}
            <Image
                ref={imageRef}
                image={canvas} 
                cornerRadius={10}
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleOnPointerLeave}
            /> 
            <Group x={WIDTH*.21} y={HEIGHT*.94}>
                <Rect
                    fill="white" 
                    width={WIDTH*.73}
                    height={WIDTH*.08}
                />
                <Text 
                    y={2}
                    width={WIDTH*.73}
                    height={WIDTH*.08}
                    fontFamily={poppins.style.fontFamily}
                    fontStyle={poppins.style.fontStyle}
                    text={reference}
                    align="center"
                    verticalAlign="middle"
                    fontSize={(WIDTH*.73) * .08}
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

FlipJackScratch.displayName = "FlipJackScratch"

export default FlipJackScratch