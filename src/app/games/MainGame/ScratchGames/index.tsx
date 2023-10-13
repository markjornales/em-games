import { CanvasProvider } from '@/components/CanvasContext';
import React from 'react';
import { Group, Image } from "react-konva";
import useImage from 'use-image';

type TStagePos = {
    x: number;
    y: number;
}

type TStageMoveProps = {
    moveTo: TStagePos;
    lineTo: TStagePos[]
}

function ScratchGames(props: any) {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize; 
    const [image] = useImage('/images/CardFlip.png');
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
    const imageRef = React.useRef<React.ComponentRef<typeof Image>>(null);
    const isPaint = React.useRef<boolean>(false);
    const [stagePointerPos, setStagePointerPos] = React.useState<TStageMoveProps[]>([]);
    

    React.useEffect(() => {
        imageDrawing();
    },[
        image, 
        stagePointerPos
    ]);

    const imageDrawing = () => {
        if(!image) {
            return;
        }    
        const canvas = document.createElement("canvas");
        canvas.width = width*.86
        canvas.height = height*.8;
        const ctx = canvas.getContext("2d")!; 
        ctx.lineJoin = "round";
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);  
        ctx.globalCompositeOperation = "destination-out";
        for(let key in stagePointerPos) {
            ctx.moveTo(stagePointerPos[key].moveTo.x, stagePointerPos[key].moveTo.y);
            for(let key2 in stagePointerPos[key].lineTo){
                ctx.lineTo(stagePointerPos[key].lineTo[key2].x, stagePointerPos[key].lineTo[key2].y)
            }
        }  
        ctx.stroke()
        setCanvas(canvas);
    }

    const handleMouseDown = () => {
        isPaint.current = true;  
        const {x, y} = imageRef.current?.getRelativePointerPosition()!;
        setStagePointerPos((initstage) => [...initstage,{
            moveTo: {x, y},
            lineTo: [{x, y}]
        }])

    }
    const handleMouseUp = () => { 
        isPaint.current = false;
    }

    const handleMouseMove = () => {
        if(isPaint.current){ 
            const {x, y} = imageRef.current?.getRelativePointerPosition()!;
            setStagePointerPos((initstage) => {
                initstage[initstage.length - 1].lineTo.push({x, y})
                return [...initstage];
            });  
        }
    }
    const handleOnPointerLeave = () => {
        isPaint.current = false
    }
    
  return (
     <Group y={(height-(height*.78))/2} x={(width-width*.86)/2}>  
        <Image 
            ref={imageRef}
            image={canvas}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleOnPointerLeave}
        />  
     </Group>
  )
}

export default ScratchGames