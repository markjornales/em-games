import React from 'react'
import { GifComponents } from '@/components/ImageComponents';
import { Group, Image, Rect, Text, } from "react-konva"; 
import { Spring, animated } from 'react-spring';

const GroupAnimation:any = animated(Group); 

export type TScratchHere = {
    width: number;
    height: number;
}

function ScratchHere({width, height}: TScratchHere) {
  return (
    <Spring from={{onstart: true}} to={{onstart: false}} delay={3000}>
        {(props) => 
            <GroupAnimation visible={props.onstart}>
                <Rect 
                    width={width} 
                    height={height}
                    fill="black"
                    opacity={0.3}
                />
                <Group x={(width-width*.6)/2} y={(height-height*.2)*.73}>
                    <GifComponents
                        src="/images/ScratchhereGRay.gif"
                        height={height*.2}
                        width={width*.6}
                    />
                </Group>
            </GroupAnimation>
        }
     </Spring>
  )
}

export default ScratchHere