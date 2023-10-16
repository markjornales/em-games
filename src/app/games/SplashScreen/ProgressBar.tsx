import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { ImageLoad } from '@/components/ImageComponents';
import Konva from 'konva';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Text } from 'react-konva';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "600"
  });
 
type TtextProps = {
    textwidth: number;
    textheight:number; 
}

function ProgressBar() {
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;
    const refText = React.useRef<any>(); 
    const [isTextProps, setTextProps] = React.useState<TtextProps>({textheight: 0, textwidth: 0});
    const [isProgress, setProgress] = React.useState<number>(0);
    const { setPlayed } = React.useContext(CanvasContext);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const bar_width = width * .45;
    const bar_heigth = width* .05;
    const minbarX = bar_width *.03
    const maxbarX = (bar_width - width*.025) - minbarX

    React.useEffect(() => { 
        setTextProps({
            textheight: refText.current.height(),
            textwidth: refText.current.width(), 
        });     
    },[isLoading]);

    
  React.useEffect(() => { 
    let minbarx = parseFloat(minbarX.toFixed(2));
    const frameAnimation = new Konva.Animation(() => {
      minbarx ++;
      const progress = Math.min(minbarx, 100);
      const progessbarwidth = (maxbarX * progress) / 100
      setProgress(Math.floor(progessbarwidth - 4));
      if((progessbarwidth + 3) > maxbarX) {
        setLoading(false);
        frameAnimation.stop();
      }
    })
    frameAnimation.start();
  },[])

  const onMouseEnter = (e: any) => { 
    const container = e.target.getStage().container();
        if(!isLoading) {
            container.style.cursor = "url(/images/hand.png), auto";
        }
  }
  const onMouseLeave = (e: any)=> {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  }

  const handleOnClickPlayed = () => {
    if(!isLoading) {
      setPlayed(true);
    }
  }

  return (
    <Group x={(width-(width*.45))/2} y={height*.8}>
        <Group height={bar_heigth} width={bar_width}>
          <ImageLoad src="/images/load_bar.png" 
              imageProps={{ 
              width: width*.45,
              height: width*.05, 
            }}
            
          />
          {Array.from(new Array(isProgress)).map((_, i) => 
            <ImageLoad 
            key={i}
            src="/images/bar_loader.png"
            imageProps={{
              height: width*.025,
              width: width*.025,
              y: (bar_heigth - (width*.025))/2,
              x: minbarX + i
            }}
          />)}
        </Group> 
        <Group 
          y={bar_heigth + 10} 
          width={bar_width} 
          height={isTextProps.textheight}> 
            <Text
                x={(bar_width-isTextProps.textwidth)/2}
                ref={refText}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave} 
                onTap={handleOnClickPlayed}
                onClick={handleOnClickPlayed}
                fill="white"
                fontSize={24}
                fontFamily={poppins.style.fontFamily}
                text={isLoading? "Loading": "PLAY"}  
            />
        </Group>
  </Group>
  )
}

export default ProgressBar