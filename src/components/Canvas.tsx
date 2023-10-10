'use client';
import "@/components/gifler";
import { Poppins } from 'next/font/google';
import { Group, Layer, Stage, Text,  } from 'react-konva';
import { GifComponents, ImageLoad } from './ImageComponents';
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600"
});

export type TCanvas = {
  width: number;
  heigth: number;
} 

function Canvas(props: TCanvas) {
  const { heigth, width } = props;   
  const refText = React.useRef<any>();
  const [isTextProps, setTextProps] = React.useState<{
    textwidth: number;
    textheight:number;
  }>({textheight: 0, textwidth: 0});

  React.useEffect(() => {
    setTextProps({
      textheight: refText.current?.getTextHeight(),
      textwidth: refText.current?.getTextWidth()
    })
  },[])


  return (
    <Stage height={heigth} width={width}>
      <Layer>
        <Group y={20}>
          <ImageLoad
            src="/images/crown.png"
            imageProps={{
              x: (width-(width*.18))/2,
              y: 16,
              width: width*.18,
              height: width*.12
            }}
          />  
          <ImageLoad
            src="/images/g_crown.png"
            imageProps={{ 
              x: (width-(width * .7))/2,
              height: width*.5,
              width: width * .7
            }}
          /> 
          <ImageLoad
            src="/images/e_crown.png"
            imageProps={{
              x: (width - (width *.56))/2,
              y: width * .35,
              width: width * .56,
              height: width * .11
            }}
          />
        </Group>
        <Group  x={(width-(width *.28))/2} y={(heigth-(width*.2))/2}>
          <GifComponents 
            src="/images/grayloaderedit.gif"
            width={width*.35}
            height={width*.35}
          />
        </Group>
        <Group x={(width-(width*.45))/2} y={heigth*.8}> 
          <ImageLoad src="/images/load_bar.png" 
            imageProps={{ 
              width: width*.45,
              height: width*.05,
              x: 10,
              y: 10
            }}
          />
          <Group x={(width/2 - isTextProps.textwidth)/2}>
            <Text
              ref={refText}
              onMouseEnter={(e: any)=> { 
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
              }}
              onMouseLeave={(e: any)=> {
                const container = e.target.getStage().container();
                container.style.cursor = "default";
              }}
              fill="white"
              fontSize={24} 
              fontFamily={poppins.style.fontFamily}
              text="PLAY"  
              y={50} 
            />
          </Group>
        </Group>
      </Layer>
    </Stage>
  );
}


export default Canvas;