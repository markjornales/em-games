import { GifComponents } from '@/components/ImageComponents';
import { Group, Rect } from "react-konva";
import { Spring, animated } from 'react-spring';

const GroupAnimation:any = animated(Group); 

export type TScratchHere = {
    BWidth: number;
    BHeight: number;
    width: number;
    height: number;
    x: number;
    y: number;
}

function ScratchHere({BHeight, BWidth, width, height, x, y}: TScratchHere) {
  return (
    <Spring from={{onstart: true}} to={{onstart: false}} delay={3000}>
        {(props) => 
            <GroupAnimation visible={props.onstart}>
                <Rect 
                    width={BWidth} 
                    height={BHeight}
                    fill="black"
                    opacity={0.3}
                />
                <Group x={x} y={y}>
                    <GifComponents
                        src="/images/ScratchhereGRay.gif"
                        height={height}
                        width={width}
                    />
                </Group>
            </GroupAnimation>
        }
     </Spring>
  )
}

export default ScratchHere