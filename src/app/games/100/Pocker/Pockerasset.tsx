import React from 'react'
import { Group, Image, Rect } from 'react-konva'
import useImage from 'use-image';

export type TPockernames = "clubs" | "spades" | "heart" | "diamond"

type TPockerassetProps = { 
    imageWidth: number;
    imageHeight: number;  
    pockername: (TPockernames| undefined)
}

function Pockerasset(props: TPockerassetProps) {
    const { imageHeight, imageWidth, pockername } = props;
    const [isImageRender] = useImage(`/images/100/pocker/${pockername}.png`);
    const [isCardRender] = useImage('/images/100/pocker/pocker-card.png'); 
    const [islettera] = useImage('/images/100/pocker/a.png');
    const [isBgCanvas, setBgCanvas] = React.useState<HTMLCanvasElement>();

    React.useEffect(() => {
        const renderImages = () => {
            if(!isCardRender) return null;
            const canvasElement = document.createElement("canvas");
            const context = canvasElement.getContext("2d")!
            canvasElement.width = imageWidth;
            canvasElement.height = imageHeight;
            context.drawImage(isCardRender,imageWidth*.25, imageWidth*.2, 80, 80, 0, 0, canvasElement.width, canvasElement.height);
            setBgCanvas(canvasElement);
        }
        renderImages();
    },[isCardRender, pockername]);
    
    return (
    <Group> 
         <Image 
            cornerRadius={8}
            image={isBgCanvas} 
            width={imageWidth}
            height={imageHeight}
         />
         <Group x={imageWidth*.06} y={imageHeight*.76}>
            <Image 
                image={islettera}
                width={imageWidth*.12}
                height={imageWidth*.11}
            />
            <Image  
                x={12}
                image={isImageRender}
                width={imageHeight*.2}
                height={imageHeight*.2}
            />
         </Group>
         <Group 
            rotation={Math.PI*56} 
            offsetX={imageWidth*.45} 
            offsetY={imageHeight*.14}
            x={imageWidth*.45} 
            y={imageHeight*.14} >
            <Image 
                image={islettera}
                width={imageWidth*.12}
                height={imageWidth*.11}
            />
            <Image  
                x={12}
                image={isImageRender}
                width={imageHeight*.2}
                height={imageHeight*.2}
            />
         </Group>
         <Group y={(imageHeight- (imageHeight*.4))/2} x={(imageWidth - (imageWidth*.4))/2}>
            <Image
                image={isImageRender}
                width={imageWidth*.4}
                height={imageHeight*.4}
            />
         </Group>
    </Group>
  )
}


export const PockerNoRender = (props: Pick<TPockerassetProps, "imageHeight"|"imageWidth">) => {
    const { imageHeight , imageWidth} = props;
    const [isCardRender] = useImage('/images/100/pocker/pocker-card.png'); 
    return <Image 
        image={isCardRender}
        width={imageWidth}
        height={imageHeight}
    />
}

export default Pockerasset
