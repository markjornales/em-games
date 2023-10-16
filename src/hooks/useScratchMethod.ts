import React from 'react';
import useImage from 'use-image';
import { TStagePos } from '../app/games/MainGame/ScratchGames/LottoGame200';

export type TStageMoveProps = {
    moveTo: TStagePos;
    lineTo: TStagePos[]
}
export type TScratchMethod = {
    WIDTH: number;
    HEIGHT: number;
    x1: number;
    y1: number;
    imageSrc: string;
}

function useScratchMethod({HEIGHT, WIDTH, x1, y1, imageSrc}: TScratchMethod) {
    
    const [image] = useImage(imageSrc);
    const [stagePointerPos, setStagePointerPos] = React.useState<TStageMoveProps[]>([]); 
    const [isScratchDone, setScratchDone] = React.useState<boolean>(false); 
    const [canvas, setCanvas] = React.useState<HTMLCanvasElement>(); 
    const context = React.useRef<CanvasRenderingContext2D|null>();
    const canvasElement = React.useRef<HTMLCanvasElement>();
   
    React.useEffect(() => {
        if(!isScratchDone) {
            if(image) {   
                canvasElement.current = document.createElement("canvas");
                context.current = canvasElement.current.getContext("2d");
                canvasElement.current.width = WIDTH;
                canvasElement.current.height = HEIGHT; 
                context.current?.drawImage(image, 0, 0, canvasElement.current.width, canvasElement.current.height); 
                setCanvas(canvasElement.current) 
            }
        }
    },[
        image, 
        stagePointerPos,
    ]);

    React.useEffect(() => {
        if(!isScratchDone) {
            if(context.current!=undefined) {
                context.current.lineJoin = "round";
                context.current.lineCap = "round";
                context.current.lineWidth = 35;
                context.current.fillStyle = "#FFFFFF";
                context.current.beginPath()
                context.current.globalCompositeOperation = "destination-out";
                if(stagePointerPos.length > 0) {
                    for(let key in stagePointerPos) {
                        context.current.moveTo(stagePointerPos[key].moveTo.x, stagePointerPos[key].moveTo.y); 
                        for(let key2 in stagePointerPos[key].lineTo){
                            context.current.lineTo(stagePointerPos[key].lineTo[key2].x, stagePointerPos[key].lineTo[key2].y);
                        }
                    }
                }
                context.current.stroke();
                const imageData = context.current.getImageData(x1, y1, WIDTH*.8, HEIGHT*.35);  
                const arraydata = imageData.data.filter((value, index) => index % 4 === (4 - 1) && value === 0);
                const maxPixels = (WIDTH*.8 )*(HEIGHT*.35);
                const percentage = (arraydata.length / maxPixels) * 100; 
                if(percentage > 99) {
                    alert("Scratch is done");
                    setScratchDone(true);
                }
            }
        }
    },[stagePointerPos]) 

    return {
        canvas,
        isScratchDone,
        setScratchDone,
        setStagePointerPos, 
    }
}

export default useScratchMethod