import { TCanvas, TCardScratchProp, authenticationProp } from "@/components/CanvasContext";
import React from "react";


export default function () {
    const canvasParent = React.useRef<HTMLDivElement>(null); 
    const [isCanvasSize, setCanvasSize] = React.useState<TCanvas>({
        height: 0,
        width: 0,
        offsound: false
    });
    const [isAuthenticated, setAuthenticated] = React.useState<authenticationProp>({
      authenticate: true,
      message: ""
    }); 
  
    const [isCardScratch, setCardScratch] = React.useState<TCardScratchProp>({
        combi: "", 
        e_wallet: 0, 
        winner: 0,
        message: "", 
        refno: "", 
        game_code: ""
    });

    React.useEffect(() => {
        handleEventListener();   
    },[]);
  
    React.useEffect(() => {
        window.addEventListener("resize", handleEventListener);
        return () => {
            window.addEventListener("resize", handleEventListener);
        }
    }, []);
  
    const handleEventListener = () => { 
        setCanvasSize({
            height: canvasParent.current?.offsetHeight || 0,
            width: canvasParent.current?.offsetWidth || 0
        });
    }
  
    const providers = {
      isCanvasSize, 
      isAuthenticated, 
      isCardScratch, 
      setAuthenticated, 
      setCanvasSize,
      setCardScratch
    }
    
    return {
        providers,
        isAuthenticated,
        canvasParent,
    }
}