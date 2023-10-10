'use client';
import "@/components/gifler";
import { Group, Layer, Stage, Text,  } from 'react-konva';
import { GifComponents, ImageLoad } from './ImageComponents';
import React from "react";
import SplashScreen from "@/app/games/SplashScreen";
import MainGAmes from "@/app/games/MainGame";


export type TCanvas = {
  width: number;
  heigth: number;
} 

function Canvas(props: TCanvas) {
  const { heigth, width } = props;    

  return (
    <Stage height={heigth} width={width}>
      <Layer>
        {/* <SplashScreen {...props}/> */}
        <MainGAmes/>
      </Layer>
    </Stage>
  );
}


export default Canvas;