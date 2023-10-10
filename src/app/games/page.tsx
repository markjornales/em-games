
"use client"
import React from "react";   
import dynamic from 'next/dynamic';
import { TCanvas } from "@/components/Canvas";

const Canvas = dynamic(() => import("@/components/Canvas"), {
    ssr: false,
});
   
export default function Page () {  
    const canvasParent = React.useRef<HTMLDivElement>(null); 
    const [isCanvasSize, setConvasSize] = React.useState<TCanvas>({
        heigth: 0,
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
            heigth: canvasParent.current?.offsetHeight || 0,
            width: canvasParent.current?.offsetWidth || 0
        });
    }

    return (
        <div className="h-screen bg-gradient-to-t from-egprimary via-egsecondary to-egprimary flex justify-center min-h-[739px]">
            <div className="flex-1 border border-green-400 max-w-[480px] " ref={canvasParent}>
                <Canvas {...isCanvasSize}/>
            </div>
        </div>
    )
}