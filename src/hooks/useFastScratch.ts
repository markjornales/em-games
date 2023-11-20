import React from 'react'
import { TStageMoveProps } from './useScratchMethod'
import Konva from 'konva'

type TUseFastScratch = {
    setStagePointerPos: React.Dispatch<React.SetStateAction<TStageMoveProps[]>>;
    speed: number;
    positions: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    }
}

function useFastScratch(props: TUseFastScratch) {
    const { setStagePointerPos, positions, speed } = props;
    const [isFastScratch, setFastScratch] = React.useState<boolean>(false);
    React.useEffect(() => { 
       const scratchAuto = (callback: any) => {
        let ypos1 = positions.y1;
        let xpos1 = positions.x1 + 12;

        const moveTo = {x: positions.x1 + 12, y: positions.y1};
        const lineTo: {x: number, y: number}[] = []
        
        const konva = new Konva.Animation(() => {
            if(xpos1 < positions.x2) {
                lineTo.push({x: xpos1, y: ypos1});
                if(ypos1 < positions.y2) {
                    ypos1 += speed; 
                } else { 
                    xpos1 += 35; 
                    ypos1 = positions.y1     
                }
                setStagePointerPos((evt) => [...evt, {lineTo, moveTo}]);
            }else {
                callback()
                konva.stop();
            }
        });
        konva.start();
       }
       if(isFastScratch){
             const sounds = new Audio("/sounds/scratch_pencil.mp3");
             sounds.loop = true; 
             sounds.play();
             setTimeout(() => {
                 scratchAuto(() => {
                    sounds.pause();
                 });
             }, 400) 
       }
    },[isFastScratch]);
   
    return {
        setFastScratch
    }
}

export default useFastScratch