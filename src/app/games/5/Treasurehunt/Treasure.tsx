import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TTreasureProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Treasure(props: TTreasureProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/treasure/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Treasure