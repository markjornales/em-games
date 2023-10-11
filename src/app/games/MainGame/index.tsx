import { TCanvas } from '@/components/Canvas'
import { ImageLoad } from '@/components/ImageComponents'
import React from 'react'
import { Text, Group, Rect } from 'react-konva'
import { Outfit } from 'next/font/google';


const poppins = Outfit({
    subsets: ["latin"],
    weight: "400"
  });

function MainGames({width, heigth}: TCanvas) {
  return (
   <>
   <Group y={10} x={20}>
      <Text 
        text="Balance" 
        fill="white"
        fontFamily={poppins.style.fontFamily}
        fontSize={18}
      />
      <ImageLoad
        src="/images/balance_bg.png"
        imageProps={{
          height: width*.1,
          width: width *.4,
          y: 18
        }}
      />
   </Group>

   <Group y={10} x={width*.65} width={width*.3}
    > 
      <Text 
        text="Times Played" 
        fill="white"
        fontFamily={poppins.style.fontFamily}
        fontSize={18}
        width={width*.29}
        align='right'
      />
      <ImageLoad
        src="/images/timesplayed_bg.png"
        imageProps={{
          height: width*.09,
          width: width *.3,
          y: 24
        }}
      />
   </Group>

   <ImageLoad
      src='/images/CardFlip.png'
      imageProps={{
        height: heigth*.817,
        width: width*.9,
        y: 80,
        x: 25,

      }}
   />

   <Group y={heigth*.935} >
    <ImageLoad
    src='/images/BackButton.png'
    imageProps={{
      height: heigth*.06,
      width: width*.15,
      x: 70,
    }}
    />

    <ImageLoad
    src='/images/start.png'
    imageProps={{
      height: heigth*.06,
      width: width*.4,
      x: 215,
    }}
    />

   </Group>



   </>
  )
}

export default MainGames