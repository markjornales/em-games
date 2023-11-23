import React, { useEffect } from 'react'
import { ImageLoad } from '@/components/ImageComponents';
import { Group, Image, Rect, Text, } from "react-konva"; 
import useImage from 'use-image';
import { Poppins } from 'next/font/google';
import {animated, useSpring} from "react-spring"

export type TPoupAlert = {
    width: number;
    height: number;
    statusWinner: number; 
    visible: boolean;
    onTap: () => void
}
const poppins = Poppins({
    subsets: ["latin"],
    weight: "500"
})




const GroupAnimation:any = animated(Group);

function useImageLists (statusWinner: number) {
    const path = "/images/popup/";
    const imageList = [
        "Lose.png",
        "prize_0.png",
        "prize_1.png",
        "prize_2.png",
        "prize_3.png",
        "prize_4.png",
    ];
    const imagelists = [
        "Lose.png", //index 0
        "p5.png", //index 1
        "p10.png", //index 2
        "p20.png", //index 3
        "p50.png", //index 4
        "p100.png", //index 5
        "p200.png", //index 6
        "p500.png", //index 7
        "p1k.png", //index 8
        "p5k.png", //index 9
        "p10k.png", //index 10
        "p20k.png", //index 11
        "p50k.png", //index 12
        "p100k.png", //index 13
        "p200k.png", //index 14
        "p500k.png", //index 15
        "p1m.png", //index 16
        "p2m.png" //index 17
    ];
    return `${path}${imagelists[statusWinner]}`
}

function PopupAlert({height, width, statusWinner, visible = false, onTap} : TPoupAlert) {
   const [imageModal] = useImage(useImageLists(statusWinner));
   const [isClicked, setClicked] = React.useState<boolean>(false);
   const [isVisible, setVisible] = React.useState<boolean>(false);
   const {opacity} = useSpring({
        from: {opacity: 0},
        to: {opacity: visible? 1: 0},
        config: {duration: 1000}
   });

   const onClickStart = () => {
    setClicked(false);  
    onTap();
  }

  React.useEffect(() => {
    if(visible) {
        if( statusWinner > 0) {
            const audio = new Audio("/sounds/tadaa.mp3");
            audio.play();
        } else {
            const audio = new Audio("/sounds/lose_sfx.mp3");
            audio.play();
        }
    }
  },[visible])

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
            <Image 
                image={imageModal}
                width={width*.7}
                height={width*.7}
            />
            <Group 
                y={width*.72} 
                x={(width*.7 - width*.2)/2} 
                opacity={isClicked? 0.6: 1}
                onPointerDown={() => setClicked(true)}
                onPointerUp={onClickStart}> 
                <ImageLoad
                    src="/images/start.png"
                    imageProps={{
                        width: width*.2,
                        height: width*.07,
                    }}
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