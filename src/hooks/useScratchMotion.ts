 import React from 'react'
import { Image } from 'react-konva';
import { TStageMoveProps } from './useScratchMethod';
import { TStagePos } from '@/app/games/200/LottoGame/ScratchGames';
export type TScratchMotion = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    setStagePointerPos: React.Dispatch<React.SetStateAction<TStageMoveProps[]>>
    isScratchDone: boolean
}

function useScratchMotion(props: TScratchMotion) {
    const {x1, x2, y1, y2, setStagePointerPos, isScratchDone} = props; 
    const isPaint = React.useRef<boolean>(false);
    const imageRef = React.useRef<React.ComponentRef<typeof Image>>(null);

    const scratchScope = ({x, y} : TStagePos) => {
        return (x > x1 && x < x2) && (y > y1 && y < y2)? true: false
    }

    const handleMouseDown = React.useCallback(() => {
        isPaint.current = true;  
        const position = imageRef.current?.getRelativePointerPosition()!;
        if(scratchScope(position)){
            setStagePointerPos((initstage) => [...initstage, {
                moveTo: {x: Math.ceil(position.x), y: Math.ceil(position.y)},
                lineTo: []
            }]);   
        }
    },[]);

    const handleMouseMove = React.useCallback(() => {
        if(isPaint.current){ 
            const position = imageRef.current?.getRelativePointerPosition()!; 
            if(scratchScope(position)){
                setStagePointerPos((initstage) => {
                    initstage[initstage.length - 1]?.lineTo.push({x: Math.ceil(position.x), y: Math.ceil(position.y)})
                    return [...initstage];
                });  
            } 
        }
    },[])

    const handleOnPointerLeave = () => {
        isPaint.current = false
    }

    const handleMouseUp = () => { 
        isPaint.current = false;
    }

    return {
        imageRef,
        handleMouseDown,
        handleMouseMove,
        handleOnPointerLeave,
        handleMouseUp
    }
}

export default useScratchMotion