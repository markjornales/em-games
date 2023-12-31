import React from "react"; 

export type TCanvas = {
    width: number;
    height: number;
    offsound?: boolean;
} 

type TCanvasContext = {
    play: boolean;
    setPlayed: React.Dispatch<React.SetStateAction<boolean>>
}

export type authenticationProp = {
    message: string;
    authenticate: boolean
}

export type TCardScratchProp = {
    combi: string;
    refno: string;
    message: string;
    winners: number;
    e_wallet: number;
    game_code: string;
    prize_image: string;
}

type TCanvasProviderProp = {
    isCanvasSize: TCanvas;
    isAuthenticated: authenticationProp;
    isCardScratch: TCardScratchProp;
    blur: boolean;
    setCanvasSize: React.Dispatch<React.SetStateAction<TCanvas>>;
    setAuthenticated: React.Dispatch<React.SetStateAction<authenticationProp>>;
    setCardScratch: React.Dispatch<React.SetStateAction<TCardScratchProp>>;
    setBlur: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasProvider = React.createContext<TCanvasProviderProp>({
    isCanvasSize: {height: 0, width: 0, offsound: false},
    isAuthenticated: {message: "", authenticate: true},
    isCardScratch: { combi: "", e_wallet: 0, message: "", refno: "", winners: 0, game_code: "", prize_image: ""},
    blur: false,
    setAuthenticated: () => {},
    setCanvasSize: () => {},
    setCardScratch: () => {},
    setBlur: () => {}
});

export const CanvasContext = React.createContext<TCanvasContext>({
    play: false, 
    setPlayed: () => {}
});

export const useCanvasContext = () => {
    const [play, setPlayed] = React.useState<boolean>(false); 
    return { play, setPlayed }
};