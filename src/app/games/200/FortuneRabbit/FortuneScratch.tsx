import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import Rabbits from './Rabbits';
import ScratchHere from '@/components/ScratchHere';
import PopupAlert from '@/components/PopupAlert';
import { shuffleArrays } from '@/hooks/functions';

type TFortuneScratchProps = {combination: boolean[][]}
type TFortuneScratchRef = {
    isScratchDone: boolean;
    reset: () => void
}

const FortuneScratch = React.forwardRef<TFortuneScratchRef, TFortuneScratchProps>((props, ref) => {
    const {combination} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = React.useRef<number>(height*.75).current;
    const WIDTH = React.useRef<number>(width*.86).current;
    const [isReset, setReset] = React.useState<boolean>(false);

    const x1 = WIDTH*.26;
    const x2 = WIDTH*.87;
    const y1 = HEIGHT*.55;
    const y2 = HEIGHT*.8
    
    const { canvas, isScratchDone, setScratchDone, setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2 - y1, width: x2 - x1}, 
        imageSrc: "/images/200/fortunerabbit/front.png"});

    const { handleMouseDown, handleMouseMove, handleMouseUp, handleOnPointerLeave, imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});
    
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
            setReset(init => !init)
        },
    }));

    const ShowRabbits = React.useMemo(() => shuffleArrays(combination).map((data, indexColumn) => 
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
    ),[isReset])

    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.78)/2}>
                <Rect cornerRadius={10} fill="#ececec" width={width*.859} height={HEIGHT*.998}/>
                {ShowRabbits}
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
                statusWinner={1}
                visible={isModalShow}
                height={height}
                width={width}
                onTap={() => {
                    setModalshow(false);
                }}
            />
            <ScratchHere 
                x={(width-width*.6)/2}
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