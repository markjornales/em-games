'use client';
import SplashScreen from "@/app/games/SplashScreen";
import "@/components/gifler";
import { Layer, Stage, } from 'react-konva';
import { CanvasContext, useCanvasContext } from "./CanvasContext";
import MainGAmes from "@/app/games/MainGame";

export type TCanvas = {
  width: number;
  heigth: number;
} 

function Canvas(props: TCanvas) {
  const { heigth, width } = props;    
  const values = useCanvasContext();
  return (
    <CanvasContext.Provider value={values}> 
      <Stage height={heigth} width={width}>
        <Layer>
          {values.play ?
            <MainGAmes/> :
            <SplashScreen {...props}/>
          }
        </Layer>
      </Stage>
    </CanvasContext.Provider>
  );
}
 
export default Canvas;