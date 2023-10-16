'use client'; 
import "@/components/gifler";
import React from "react";
import { Layer, Stage, } from 'react-konva';
import { CanvasContext, CanvasProvider, useCanvasContext } from "./CanvasContext";
import SplashScreen from "./SplashScreen";

function PageCanvas({children}: {children: React.ReactNode}) { 
  const { isCanvasSize } = React.useContext(CanvasProvider); 
  const values = useCanvasContext();
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