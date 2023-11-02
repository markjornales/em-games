import { CanvasProvider } from '@/components/CanvasContext';
import useScratchMethod from '@/hooks/useScratchMethod';
import useScratchMotion from '@/hooks/useScratchMotion';
import React from "react";
import { Group, Image, Rect } from "react-konva"; 
import PopupAlert from '@/components/PopupAlert';  
import SuperBall from './SuperBall';

type TSuperBallScratch = {
    combination: ((0|1|2)|undefined)[]
}
type TSuperBallBRef = {
    isScratchDone: boolean;
    reset: () => void
}   

const SuperBallScratch = React.forwardRef<TSuperBallBRef, TSuperBallScratch>((props, ref) => {
    const { combination } = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isModalShow, setModalshow] = React.useState<boolean>(false);
    const HEIGHT = height*.75;
    const WIDTH = width*.86;
    const x1 = WIDTH*.85;
    const y1 = HEIGHT*.17;
    const x2 = WIDTH*.95;
    const y2 = HEIGHT*.46;
    
    const {
        canvas, 
        isScratchDone, 
        setScratchDone,
         setStagePointerPos
    } = useScratchMethod({HEIGHT, WIDTH, x1, y1, scratchArea: {height: y2-y1, width: x2-x1}, 
        imageSrc: "/images/200/superball/front.png"});
    

    const {
        handleMouseDown, 
        handleMouseMove, 
        handleMouseUp, 
        handleOnPointerLeave, 
        imageRef
    } = useScratchMotion({x1, x2, y1, y2, isScratchDone, setStagePointerPos});

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
        },
    }));
    
    return (
        <Group>
            <Group x={(width- WIDTH)/2} y={(height-height*.78)/2}>
                <Rect cornerRadius={10} fill="#f0f0f1"width={width*.859} height={HEIGHT}/>
                {combination.map((value, index) => 
                    <Group key={index} opacity={value == index ? 1: 0.2} x={WIDTH*.825} y={HEIGHT*(.19 + (0.094 * index))}>
                        <SuperBall
                            dHeight={HEIGHT}
                            dWidth={WIDTH}
                            imageHeight={WIDTH*.15}
                            imageWidth={WIDTH*.15} 
                            indexColor={index}
                        />
                    </Group>
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
                statusWinner={0}
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

SuperBallScratch.displayName = "SuperBallScratch"

export default SuperBallScratch;