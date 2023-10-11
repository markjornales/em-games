'use client';
import SplashScreen from "@/app/games/SplashScreen";
import "@/components/gifler";
import { Layer, Stage } from 'react-konva';

export type TCanvas = {
  width: number;
  heigth: number;
} 

function Canvas(props: TCanvas) {
  const { heigth, width } = props;    

  return (
    <Stage height={heigth} width={width}>
      <Layer>
        <SplashScreen {...props}/>
        {/* <MainGAmes/> */}
      </Layer>
    </Stage>
  );
}


export default Canvas;