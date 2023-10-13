import { ImageLoad } from '@/components/ImageComponents';
import { Outfit } from 'next/font/google';
import React from 'react';
import { Group, Text } from 'react-konva';
import { CanvasProvider } from './CanvasContext';

const outfit = Outfit({
    subsets: ["latin"],
    weight: "800",
    display: "swap"
  });
type TCButton = {
  onclickStart: () => void
  label: string;
}

function CButton(props: TCButton) {
    const { onclickStart, label} = props;
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const [isClicked, setClicked] = React.useState<boolean>(false);
    const [isClickBack, setClickBack] = React.useState<boolean>(false);
    const fontSizeDefault = width*.04;

    const onClickStart = () => {
      setClicked(false);
      onclickStart();
    }
    
  return (
    <Group x={(width-((width*.35) + (width*.12)))/2} y={height*.925}>
          <Group 
            opacity={isClickBack? 0.5: 1} 
            onPointerDown={() => setClickBack(true)}
            onPointerUp={() => setClickBack(false)}>
              <ImageLoad
                src="/images/BackButton.png"
                imageProps={{
                  height: width*.09,
                  width: width*.12,
                }}
              />
          </Group>
          <Group 
            x={(width*.12) * 1.3} 
            opacity={isClicked? 0.6: 1}
            onPointerDown={() => setClicked(true)}
            onPointerUp={onClickStart}> 
            <ImageLoad
              src="/images/start.png"
              imageProps={{
                width: width*.35,
                height: width*.09,
              }}
            />
            <Text
              fill="#5E1700"
              text={label || "START"}
              align="center"
              verticalAlign="middle"
              width={width*.35}
              height={width*.09}
              fontSize={fontSizeDefault}
              fontFamily={outfit.style.fontFamily}
            />
          </Group>
        </Group>
  )
}

export default CButton