'use client'; 
import "@/components/gifler";
import { Layer, Stage, } from 'react-konva';
import { CanvasContext, CanvasProvider, useCanvasContext } from "./CanvasContext";
import React from "react";
import MainGames from "@/app/games/200/LottoGame";
import SplashScreen from "./SplashScreen";

function Canvas() { 
  const { isCanvasSize } = React.useContext(CanvasProvider); 
  const values = useCanvasContext();
  return (
    <CanvasContext.Provider value={values}> 
      <Stage {...isCanvasSize}>
        <Layer> 
            {values.play ? <MainGames /> : <SplashScreen />}
        </Layer>
      </Stage>
    </CanvasContext.Provider>
  );
}
 
export default Canvas;