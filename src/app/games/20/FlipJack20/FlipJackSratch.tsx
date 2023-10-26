import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import JackImage from './JackImage';

type TFlipJackScratchProps = {}
type TFlipJackScratchRef = {}

const FlipJackScratch = React.forwardRef<TFlipJackScratchRef, TFlipJackScratchProps>(() => {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;

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

            {Array.from(new Array(2)).map((_, indexRow) => 
                Array.from(new Array(3)).map((_, indexColumn) => 
                    <JackImage
                        dwidth={WIDTH}
                        dheight={HEIGHT}
                        imageHeight={WIDTH*.25}
                        imageWidth={WIDTH*.19}
                        x={WIDTH*(.148 + (0.255 * indexColumn))}
                        y={WIDTH*(.88 + (0.285 * indexRow))}
                    />
                
                )
            )}

        </Group>
    </Group>
  );
});

export default FlipJackScratch