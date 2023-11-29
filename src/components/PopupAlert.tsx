import { ImageLoad } from '@/components/ImageComponents';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Image, Rect, Text, } from "react-konva";
import { animated, useSpring } from "react-spring";
import useImage from 'use-image';
import { CanvasProvider } from './CanvasContext';

export type TPoupAlert = {
    width: number;
    height: number; 
    visible: boolean;
    onTap: () => void
}
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
})


const GroupAnimation:any = animated(Group);

function PopupAlert({height, width, visible = false, onTap} : TPoupAlert) {
   const { isCardScratch, setBlur } = React.useContext(CanvasProvider); 
   const [imageModal] = useImage(`/images/popup/${isCardScratch.prize_image}`);
   const [isClicked, setClicked] = React.useState<boolean>(false); 
   const {opacity} = useSpring({
        from: {opacity: 0},
        to: {opacity: visible? 1: 0},
        config: {duration: 400}
   });

   const onClickStart = () => {
    setClicked(false);  
    setBlur(false);
    onTap();
  }

  React.useEffect(() => {
    if(visible) {
        if( isCardScratch.winners > 0) {
            const audio = new Audio("/sounds/tadaa.mp3");
            audio.play();
        } else {
            const audio = new Audio("/sounds/lose_sfx.mp3");
            audio.play();
        }
    }
  },[visible]);

  React.useEffect(() => {
    if(visible){
      setBlur(true); 
    }
  }, [visible]);

  return (
    <GroupAnimation visible={visible} 
        opacity={opacity}>
        <Rect
            fill="black"
            opacity={0.7} 
            width={width} 
            height={height}
        />
        <Group x={(width-width*.7)/2} y={(height - width*.76)/2}>
            <Image image={imageModal} width={width*.7} height={width*.7}/>
            <Group 
                y={width*.72} 
                x={(width*.7 - width*.2)/2} 
                opacity={isClicked? 0.6: 1}
                onPointerDown={() => setClicked(true)}
                onPointerUp={onClickStart}> 
                <ImageLoad
                    src="/images/start.png"
                    imageProps={{ width: width*.2, height: width*.07, }}
                />
                <Text
                    fill="#5E1700"
                    text="Close"
                    align="center"
                    verticalAlign="middle"
                    width={width*.2}
                    height={width*.07}
                    fontSize={width*.03}
                    fontFamily={poppins.style.fontFamily}
                />
            </Group>
        </Group>
     </GroupAnimation>
  )
}

export default PopupAlert