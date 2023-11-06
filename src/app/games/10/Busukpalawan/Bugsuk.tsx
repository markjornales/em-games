import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TBugsukProps = { 
    imageWidth: number;
    imageHeight: number; 
}

function Bugsuk(props: TBugsukProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/10/bugsuk/bugsuk.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Bugsuk