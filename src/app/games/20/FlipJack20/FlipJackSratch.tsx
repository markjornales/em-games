import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import JackImage from './JackImage';

export type TCombination = "jack"

type TFlipJackScratchProps = {
    combination: (TCombination|undefined)[][]
}
type TFlipJackScratchRef = {
}

const FlipJackScratch = React.forwardRef<TFlipJackScratchRef, TFlipJackScratchProps>((props, ref) => {
    const { combination } = props;
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
        imageSrc: "/images/20/flipjack/front.png"});

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

        
    return (
    <Group>
        <Group  x={(width- WIDTH)/2} y={(height-height*.78)/2}>
            <Rect cornerRadius={10} fill="white" width={width*.859} height={HEIGHT*.998}/>
            {combination.map((dataArray, indexRow) => 
                dataArray.map((jack, indexColumn) => 
                    <JackImage
                        value={jack}
                        dwidth={WIDTH}
                        dheight={HEIGHT}
                        imageWidth={WIDTH*.18}
                        imageHeight={WIDTH*.27}
                        x={WIDTH*(.148 + (0.255 * indexColumn))}
                        y={WIDTH*(.97 + (0.32 * indexRow))}
                    />
                
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
            {/* <Rect 
                fill="red"
                width={x2-x1}
                height={y2-y1}
                x={x1}
                y={y1}
            /> */}

            

        </Group>
    </Group>
  );
});

export default FlipJackScratch