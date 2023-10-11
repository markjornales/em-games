import React from "react";

type TCanvasContext = {
    play: boolean;
    setPlayed: React.Dispatch<React.SetStateAction<boolean>>
}

export const CanvasContext = React.createContext<TCanvasContext>({
    play: false, 
    setPlayed: () => {}
});

export const useCanvasContext = () => {
    const [play, setPlayed] = React.useState<boolean>(false);
    
    return {
        play, 
        setPlayed
    }
}