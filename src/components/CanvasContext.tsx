import React from "react"; 

export type TCanvas = {
    width: number;
    height: number;
} 

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
};

type TCanvasProviderProp = {
    isCanvasSize: TCanvas,
    setCanvasSize?: React.Dispatch<React.SetStateAction<TCanvas>>
};

export const CanvasProvider = React.createContext<TCanvasProviderProp>({
    isCanvasSize: {height: 0, width: 0},
});