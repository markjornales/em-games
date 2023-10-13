import { ImageLoad } from '@/components/ImageComponents';
import { animated, useSpring } from "@react-spring/konva";
import React from 'react';
import { Group } from 'react-konva';
import { CanvasProvider } from './CanvasContext';

const AnimatedGroup:any = animated(Group);
function ImageFlip() {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;
    const groupReference = React.useRef<React.ComponentRef<typeof Group>>(null);
    const [isClicked, setClicked] = React.useState<boolean>(false);
    const [isdoubleclick, setdoubleclick] = React.useState<boolean>(false);
    const [springs, setSpring] = useSpring({from: {scalex: 1.0}, to: {scale: 0.0}},[]); 

    const handleAnimationClickGroup = (e: any) => { 
        if(!isdoubleclick){ 
            setSpring.start({
                from: {scalex: 1.0},
                to: {scalex: 0.0}
            });
            setdoubleclick(true);
            setTimeout(() => {
                setClicked((x) => !x);
                setSpring.start({
                    from: {scalex: 0.0},
                    to: {scalex: 1.0}
                });
                setdoubleclick(false);
            },500); 
        }
    }

    return (
        <Group y={(height-(height*.78))/2} x={(width-width*.86)/2}> 
            <AnimatedGroup 
                scaleX={springs.scalex}
                ref={groupReference}
                x={width*.86/2}
                offsetX={width*.86/2}
                onPointerUp={handleAnimationClickGroup}>
                <ImageLoad
                    src={`/images/${isClicked? 'backflip':'CardFlip'}.png`}
                    imageProps={{
                    width: width*.86,
                    height: height*.8,
                    cornerRadius: 10, 
                }}/>
            </AnimatedGroup>
        </Group>
    );
}

export default ImageFlip