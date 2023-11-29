import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import DiceImage from './DiceImage';
import PopupAlert from '@/components/PopupAlert';
import useFastScratch from '@/hooks/useFastScratch';

type TDiceScratchProps = {
    combination: (number|null)[][]
}
type TDiceScratchRef = {}

const DiceScratch = React.forwardRef<TDiceScratchRef, TDiceScratchProps>((props, ref) => {
    const {combination} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT =height*.75;
    const WIDTH = width*.86;

    const x1 = WIDTH*.29;
    const x2 = WIDTH*.87;
    const y1 = HEIGHT*.54;
    const y2 = HEIGHT*.93
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos } = useScratchMethod({
        x1, 
        y1, 
        HEIGHT, 
        WIDTH, 
        scratchArea: { height: y2 - y1, width: x2 - x1 }, 
        imageSrc: "/images/20/dicerush/frontnew.png",
    });

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
    
    return (
    <Group>
        <Group x={(width- WIDTH)/2} y={(height-height*.8)/2}>
            <Rect cornerRadius={10} fill="#464646" width={width*.859} height={HEIGHT*.998}/>
            {canvas && combination.map((dataArray, indexRow) => 
                dataArray.map((values, indexColumn) => 
                    <DiceImage
                        key={indexRow + indexColumn}
                        dheight={HEIGHT}
                        dwidth={WIDTH}
                        imageHeight={WIDTH*.2}
                        imageWidth={WIDTH*.2}
                        y={WIDTH*(.88 + (0.21 * indexRow))}
                        x={WIDTH*(.32 + (0.3 * indexColumn))}
                        dicesValue={values}
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

DiceScratch.displayName = "DiceScratch"

export default DiceScratch