 
import { CanvasProvider } from '@/components/CanvasContext';
import { GifComponents, ImageLoad } from '@/components/ImageComponents';
import { Spring, animated } from "@react-spring/konva";
import React from 'react';
import { Group } from 'react-konva';
import ProgressBar from './ProgressBar';
import AnimateEmperor from './animated/emperor';

const GroupImages:any = animated(Group);

function SplashScreen() { 
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;

  return (
    <Group>
      <Group y={20}>
        <Spring
          from={{x: width*1.2}}
          to={{x:  (width-(width*.18))/2}}>
          {(props) => (
            <GroupImages x={props.x}>
              <ImageLoad
                src="/images/crown.png"
                imageProps={{ 
                  y: 16,
                  width: width*.18,
                  height: width*.12
                }}
              /> 
            </GroupImages>
          )}
        </Spring>
        <Spring 
          from={{x: -width}}
          to={{x: (width-(width * .7))/2}}>
          {(props) => ( 
            <GroupImages x={props.x}>
              <ImageLoad
                src="/images/g_crown.png"
                imageProps={{  
                  height: width*.5,
                  width: width * .7
                }}
              />
            </GroupImages>
          )}
        </Spring> 
        <AnimateEmperor width={width} height={height}/>
      </Group>
      <Group  x={(width-(width *.28))/2} y={(height-(width*.2))/2}>
        <GifComponents 
          src="/images/grayloaderedit.gif"
          width={width*.35}
          height={width*.35}
        />
      </Group>
      <ProgressBar />
    </Group>
  );
}

export default SplashScreen