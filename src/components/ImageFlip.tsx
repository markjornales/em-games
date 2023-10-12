import React from 'react'
import { Group, Rect, Text,  } from 'react-konva'; 
import { ImageLoad } from '@/components/ImageComponents'; 
import { CanvasProvider } from './CanvasContext'; 

function ImageFlip() {
    const { isCanvasSize } = React.useContext(CanvasProvider);
    const { height, width } = isCanvasSize;

    return (
        <Group 
            x={(width - width*.86)/2}
            y={(height - height*.78)/2}>
            <ImageLoad
                src="/images/CardFlip.png"
                imageProps={{
                width: width*.86,
                height: height*.8,
                cornerRadius: 10,
                }}
            />
        </Group>
    )
}

export default ImageFlip