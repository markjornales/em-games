import { ImageLoad } from '@/components/ImageComponents';
import { Outfit } from 'next/font/google';
import React from 'react';
import { Group, Text } from 'react-konva';
import { CanvasProvider } from './CanvasContext';

const poppins = Outfit({
    subsets: ["latin"],
    weight: "400"
});

type TRefKonvaText = React.ComponentRef<typeof Text>;
type TConstTextSize = {
  height: number;
  tWidth: number;
  bAwidth: number;
}

type TBalanceBarProps = {
  balance_amount: number;
  time_played: number;
}

function BalanceBar({  balance_amount, time_played }: TBalanceBarProps) {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const refBalance = React.useRef<TRefKonvaText>(null);
    const refTimesPlayed = React.useRef<TRefKonvaText>(null); 
    const refBalAmount = React.useRef<TRefKonvaText>(null);
    const [isSizeText, setSizeText] = React.useState<TConstTextSize>({
      height: 0,
      tWidth: 0,
      bAwidth: 0
    });
    const BalWidth = width*.4; 
    const BalHeight = width*.1;
    const TfontSize = width*.035
   
    React.useEffect(() => {
      resizeFonts()
    },[]);

    const resizeFonts = () => {
      setSizeText({
        height: refBalance.current?.height() || 0,
        tWidth: refTimesPlayed.current?.width() || 0,
        bAwidth: refBalAmount.current?.width() || 0
      });
    } 

  return (
    <Group y={isSizeText.height}>
        <Group> 
            <Text 
              x={15}
              text="Balance"
              fill="white"
              ref={refBalance}
              fontFamily={poppins.style.fontFamily}
              fontSize={TfontSize}
            />
            <Text
              text="Times Played" 
              fill="white"
              fontFamily={poppins.style.fontFamily}
              x={width - (isSizeText.tWidth + 13)}
              ref={refTimesPlayed}
              fontSize={TfontSize}
            />
        </Group> 
        <Group y={isSizeText.height}>
            <Group x={10}>
              <ImageLoad 
                src="/images/balance_bg.png"
                imageProps={{
                    width: BalWidth,
                    height: BalHeight, 
                }}
              />
              <Text
                fill="white"
                align="right" 
                verticalAlign="middle"
                text={balance_amount?.toLocaleString()} 
                ref={refBalAmount} 
                width={BalWidth*.92}  
                height={BalHeight}
                fontSize={TfontSize}
                fontFamily={poppins.style.fontFamily}
              />
            </Group>
            <Group x={width-(BalWidth*.7)} y={(BalHeight - BalHeight*.8)/2}>
              <ImageLoad
                src="/images/timesplayed_bg.png"
                imageProps={{
                    width: BalWidth*.65,
                    height: BalHeight*.9,
                }}
              />
              <Text 
                text={time_played.toLocaleString()}
                fill="white"
                align="right"
                verticalAlign="middle"
                fontFamily={poppins.style.fontFamily}
                fontSize={TfontSize}
                width={BalWidth*.57}
                height={BalHeight*.75}
              />
            </Group>
        </Group>
    </Group>
  )
}

export default BalanceBar