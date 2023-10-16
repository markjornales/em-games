import React from 'react'
import { TStagePos } from '..';
import useImage from 'use-image';
import Konva from 'konva';

type TStageMoveProps = {
    moveTo: TStagePos;
    lineTo: TStagePos[]
}
type TScratchMethod = {
    WIDTH: number;
    HEIGHT: number;
    x1: number;
    y1: number;
}

function useScratchMethod({HEIGHT, WIDTH, x1, y1}: TScratchMethod) {
    
    const [image] = useImage('/images/CardFlip.png');
    const [stagePointerPos, setStagePointerPos] = React.useState<TStageMoveProps[]>([]); 
    const [isScratchDone, setScratchDone] = React.useState<boolean>(false); 
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement>(); 
    const [isImageElement, setImageElement] = React.useState<HTMLImageElement|undefined>()


    React.useEffect(() => {
        if(!isScratchDone) {
            if(image) {  
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d")!; 
                canvas.width = WIDTH;
                canvas.height = HEIGHT;
                ctx.lineJoin = "round";
                ctx.lineCap = "round"
                ctx.lineWidth = 35;
                ctx.fillStyle = "#FFFFFF"
                ctx.beginPath();
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);  
                ctx.globalCompositeOperation = "destination-out";
                if(stagePointerPos.length > 0) {
                    for(let key in stagePointerPos) {
                        ctx.moveTo(stagePointerPos[key].moveTo.x, stagePointerPos[key].moveTo.y);  
                        for(let key2 in stagePointerPos[key].lineTo){
                            ctx.lineTo(stagePointerPos[key].lineTo[key2].x, stagePointerPos[key].lineTo[key2].y); 
                        }
                    } 
                }
                ctx.stroke()
                const imageData = ctx.getImageData(x1, y1, WIDTH*.8, HEIGHT*.35);  
                const arraydata = imageData.data.filter((value, index) => index % 4 === (4 - 1) && value === 0);
                const maxPixels = (WIDTH*.8 )* (HEIGHT*.35);
                const percentage = (arraydata.length / maxPixels) * 100; 
                if(percentage > 99) {
                    alert("Scratch is done");
                    setScratchDone(true);
                } 
                setCanvas(canvas); 
            }
        }
    },[
        image, 
        stagePointerPos
    ]);

    return {
        canvas,
        isScratchDone,
        setScratchDone,
        setStagePointerPos, 
    }
}

export default useScratchMethod