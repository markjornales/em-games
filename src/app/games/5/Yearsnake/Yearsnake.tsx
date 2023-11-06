import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image';

type TYearsnakeProps = { 
    imageWidth: number;
    imageHeight: number;
}

function Yearsnake(props: TYearsnakeProps) {
    const { imageHeight, imageWidth } = props;
    const [isImageRender] = useImage(`/images/5/yearofsnake/asset.png`);
    return (
    <Image 
        image={isImageRender}
        width={imageWidth}
        height={imageHeight}
    />
  )
}

export default Yearsnake