'use client';
import SplashScreen from "@/app/games/SplashScreen";
import "@/components/gifler";
import { Layer, Stage, } from 'react-konva';
import { CanvasContext, CanvasProvider, useCanvasContext } from "./CanvasContext";
import MainGames from "@/app/games/MainGame";
import React from "react";

function Canvas() { 
  const { isCanvasSize } = React.useContext(CanvasProvider); 
  const values = useCanvasContext();
  return (
    <CanvasContext.Provider value={values}> 
      <Stage {...isCanvasSize}>
        <Layer>
          {/* <MainGames/> */}
            {values.play ? <MainGames /> : <SplashScreen />}
        </Layer>
      </Stage>
    </CanvasContext.Provider>
  );
}
 
export default Canvas;