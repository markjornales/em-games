
"use client"
import React from "react";   
import dynamic from 'next/dynamic';
import { TCanvas } from "@/components/Canvas"; 
import { CanvasProvider } from "@/components/CanvasContext";

const Canvas = dynamic(() => import("@/components/Canvas"), {
    ssr: false,
});
   
export default function Page () {  
    const canvasParent = React.useRef<HTMLDivElement>(null); 
    const [isCanvasSize, setConvasSize] = React.useState<TCanvas>({
        height: 0,
        width: 0,
    });

    React.useEffect(() => {
        handleEventListener()   
    },[]);

    React.useEffect(() => {
        window.addEventListener("resize", handleEventListener);
        return () => {
            window.addEventListener("resize", handleEventListener);
        }
    }, []);

    const handleEventListener = () => {
        setConvasSize({
            height: canvasParent.current?.offsetHeight || 0,
            width: canvasParent.current?.offsetWidth || 0
        });
    }

    return (
        <CanvasProvider.Provider value={{isCanvasSize}}>
            <div className="h-screen bg-gradient-to-t from-egprimary via-egsecondary to-egprimary flex justify-center  min-h-[739px] min-w-[480px]"> 
                <div className="flex-1 max-w-[480px]  max-h-[813px]" ref={canvasParent}>
                    <Canvas />
                </div>
            </div>
        </CanvasProvider.Provider>
    )
}