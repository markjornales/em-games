import { CanvasProvider } from '@/components/CanvasContext';
import { ImageLoad } from '@/components/ImageComponents';
import React from 'react'
import Konva from "konva"
import {Group, Image, Path,} from "react-konva"
import useImage from 'use-image';
import { KonvaEventObject } from 'konva/lib/Node';


// const sampledraw = [
//     {
    //         moveTo: {x: 10, y: 10},
    //         lineTo: [{x: 100, y: 600}, {x: 200, y: 506}] 
    //     },
    //     {
        //         moveTo: {x: 20, y: 10},
        //         lineTo: [{x: 120, y: 620}]
        //     }
        // ];
        
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
    const [image]  = useImage('/images/CardFlip.png');
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
    const imageRef = React.useRef<React.ComponentRef<typeof Image>>(null);
    const isPaint = React.useRef<boolean>(false);
    const [stagePointerPos, setStagePointerPos] = React.useState<TStageMoveProps[]>([]);
    

    React.useEffect(() => {
        imageDrawing();
    },[image, stagePointerPos]);


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
        console.log(stagePointerPos)
        ctx.stroke()
        setCanvas(canvas);
    }

    const handleMouseDown = (e:KonvaEventObject<MouseEvent>) => {
        isPaint.current = true; 
        console.log('mousedown');
        const {x, y} = imageRef.current?.getRelativePointerPosition()!;
        // const stage = e.target.getStage()!;
        // const {x, y} = stage.getPointerPosition()!; 
        // console.log(x, y)
        setStagePointerPos((initstage) => [...initstage,{
            moveTo: {x, y},
            lineTo: [{x, y}]
        }])

    }
    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {    
        console.log('mouseup')
        isPaint.current = false;
    }

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        if(isPaint.current){
            // const stages = e.target.getStage()!;
            // const {x, y} = stages.getPointerPosition()!; 
            // console.log({x, y})
            const {x, y} = imageRef.current?.getRelativePointerPosition()!;
            setStagePointerPos((initstage) => {
                initstage[initstage.length - 1].lineTo.push({x, y})
                return [...initstage];
            });
            // console.log('mouse moving') 
        }
    }
    const handleOnPointerLeave = () => {
        isPaint.current = false
    }
    
  return (
     <Group y={(height-(height*.78))/2} x={(width-width*.86)/2}>  
        <Image ref={imageRef}
            onPointerDown={handleMouseDown}
            onPointerUp={handleMouseUp}
            onPointerMove={handleMouseMove}
            onPointerLeave={handleOnPointerLeave}
            image={canvas}/>  
     </Group>
  )
}

export default ScratchGames