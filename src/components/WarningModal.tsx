import React from 'react'
import { ImageLoad } from '@/components/ImageComponents';
import { Poppins, Lato } from 'next/font/google';
import { Group, Rect, Text,  } from 'react-konva';
import { animated, useSpring } from '@react-spring/konva'; 
import { CanvasProvider } from '@/components/CanvasContext';

const AnimationGroup:any = animated(Group);

const lato = Lato({ 
  weight: '700',
  subsets: ["latin"]
});

const lato2 = Lato({
  weight: "400",
  subsets: ["latin"]
})  

type TWarningmodal = {
  textstring: string;
}

function WarningModal({textstring}: TWarningmodal) {
    const { isCanvasSize, setBlur } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isClicked, setClicked] = React.useState<boolean>(false);
    const [isVisible, setVisible] = React.useState<boolean>(true);
   
    React.useEffect(() => {
      if(isVisible){
        setTimeout(() => {
          setBlur(true);
        }, 500)
      }
    }, [isVisible]);

    const animatedSpring = useSpring({
        from: {opacity: 0},
        to: {opacity: 1},
        delay: 500
    });

    const handleOnclickOkUp = () => {
      setClicked(false);
      setVisible(false);
      setBlur(false);
    }
    const handleOnclickOkDown = () => {
      setClicked(true);
    }

  return (
    <AnimationGroup opacity={animatedSpring.opacity} visible={isVisible}>
      <Rect fill="black" opacity={0.3} {...isCanvasSize}/>
      <Group x={(width-(width*.5))/2} y={(height-(width*.6))/2}>
        <Rect fill="white" cornerRadius={10} width={width*.5} height={width/2}/>
        <Text y={20} width={width*.5} align="center" text="REMINDERS!" fontFamily={lato.style.fontFamily} fontSize={18}/>
        <ImageLoad
          src="/images/warning.png"
          imageProps={{
            width: width*.16,
            height: width*.16,
            x: (width*.5 - width*.16)/2,
            y: (width*.5 - width*.26)/2
          }}
        />
        <Text 
          padding={20}
          y={(width/2)/2}
          width={width*.5} 
          fontSize={width*.04}
          fontFamily={lato2.style.fontFamily} 
          text={textstring} 
          align="center"
        />
        <Group
          x={(width*.5 - (width*.5/2))/2}
          y={width/2 - width*.12}
          onPointerUp={handleOnclickOkUp}
          onPointerDown={handleOnclickOkDown}
          opacity={isClicked? 0.3: 1}>
          <Rect  
            shadowBlur={2}
            fill="#979797"
            width={width*.5/2}
            height={width*.08}
            cornerRadius={5}
          />
          <Text 
            width={width*.5/2}
            height={width*.08}
            align="center"
            verticalAlign="middle"
            fill="white"
            fontFamily={lato2.style.fontFamily}
            fontSize={width*.03}
            text="OK"
          />
        </Group>
      </Group>
  </AnimationGroup>
  )
}

export default WarningModal