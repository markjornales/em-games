'use client'; 
import "@/components/gifler";
import React from "react";
import { Layer, Stage, } from 'react-konva';
import { CanvasContext, CanvasProvider, useCanvasContext } from "./CanvasContext";
import SplashScreen from "./SplashScreen";
import Konva from "konva";

function PageCanvas({children}: {children: React.ReactNode}) { 
  const { isCanvasSize } = React.useContext(CanvasProvider); 
  const values = useCanvasContext();
 
  // React.useEffect(() => {
  //   const audio = new Audio("/sounds/thailandmp3.mp3");
  //   const animate = new Konva.Animation(() => { 
  //       audio.loop = true;
  //       audio.play();  
  //   });
  //   if(!isCanvasSize.offsound) {
  //     animate.start(); 
  //   } else {
  //     audio.pause()
  //     animate.stop();
  //   }
  //   return () => {
  //     audio.pause();
  //     animate.stop(); 
  //   }
  // },[isCanvasSize.offsound]);

  return (
    <CanvasContext.Provider value={values}> 
      <Stage {...isCanvasSize}>
        <Layer> 
            {values.play ? children : <SplashScreen />}
        </Layer>
      </Stage>
    </CanvasContext.Provider>
  );
}
 
export default PageCanvas;