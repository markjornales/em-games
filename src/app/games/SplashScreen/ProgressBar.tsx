import { TCanvas } from '@/components/Canvas';
import { CanvasContext } from '@/components/CanvasContext';
import { ImageLoad } from '@/components/ImageComponents';
import Konva from 'konva';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Text } from 'react-konva';

const poppins = Poppins({
    subsets: ["latin"],
    weight: "600"
  });

const MAX_LOADING = 192; 

type TtextProps = {
    textwidth: number;
    textheight:number;
}

function ProgressBar({heigth, width}: TCanvas) {
    const refText = React.useRef<any>(); 
    const [isTextProps, setTextProps] = React.useState<TtextProps>({textheight: 0, textwidth: 0});
    const [isProgress, setProgress] = React.useState<number>(0);
    const { setPlayed } = React.useContext(CanvasContext);

    React.useEffect(() => { 
        setTextProps({
            textheight: refText.current.height(),
            textwidth: refText.current.width()
        });     
    },[]);
  
    React.useEffect(() => {
        let x = 1;
        const animate = new Konva.Animation((frames) => {
          x++;
          let progress = Math.min(x, 100);
          const barWidth = (MAX_LOADING * progress) / 100
          setProgress(Math.floor(barWidth));
          if(barWidth == MAX_LOADING) {
            setTextProps((e) => ({...e,  
              textwidth: refText.current?.width()
            })); 
            animate.stop(); 
          }
        },[]); 
        animate.start();
      },[]); 

  const onMouseEnter = (e: any) => { 
    const container = e.target.getStage().container();
        if(!(isProgress < MAX_LOADING)) {
            container.style.cursor = "url(/images/hand.png), auto";
        }
  }
  const onMouseLeave = (e: any)=> {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  }

  const handleOnClickPlayed = () => {
    if(!(isProgress < MAX_LOADING)) {
      setPlayed(true);
    }
  }

  return (
    <Group x={(width-(width*.45))/2} y={heigth*.8}>
        <Group>
        <ImageLoad src="/images/load_bar.png" 
            imageProps={{ 
            width: width*.45,
            height: width*.05,
            x: 10,
            y: 10
            }}
        />
        {Array.from(new Array(isProgress)).map((_, i) => 
            <ImageLoad src="/images/bar_loader.png" 
            key={i}
            imageProps={{ 
            width: width*.025,
            height: width*.025,
            x: 17 + i,
            y: 16
            }}
        />)}
        </Group> 
        <Group x={(width/2 - isTextProps.textwidth)/2}>
            <Text
                ref={refText}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={handleOnClickPlayed}
                fill="white"
                fontSize={24} 
                fontFamily={poppins.style.fontFamily}
                text={isProgress < MAX_LOADING? "Loading": "PLAY"}  
                y={50} 
            />
        </Group>
  </Group>
  )
}

export default ProgressBar