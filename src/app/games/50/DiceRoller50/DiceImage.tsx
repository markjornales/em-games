import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';

export type TDicename = "5"|"10"|"20"|"50"|"100"|"200"|"500"|"1k"|"5k"|"50k"|"500k" 

type TDiceImage = {
    dwidth: number;
    dheight: number;
    x?: number;
    y?: number;
    imageHeight: number;
    imageWidth: number; 
    diceName:TDicename
}

function DiceImage(props: TDiceImage) {
    const { dheight, dwidth, imageHeight, imageWidth, x, y, diceName} = props;
    const [drawImages] = useImage(`/images/50/diceroller/${diceName}.png`);
    // const [isImageShow, setImageShow] = React.useState<HTMLCanvasElement>();

    // React.useEffect(() => {
    //     if(drawImages) {
    //         const canvasElement = document.createElement("canvas");
    //         const context = canvasElement.getContext("2d")!;
    //         canvasElement.width = dwidth;
    //         canvasElement.height = dheight;
            
    //         const diceList = [
    //             { sx: dwidth*.36, sy: dwidth*2.56, swidth: 190, sheight: 250},
    //             { sx: dwidth*1.07, sy: dwidth*2.527, swidth: 190, sheight: 250},
    //             { sx: dwidth*1.77, sy: dwidth*2.54, swidth: 190, sheight: 250},
    //             { sx: dwidth*.36, sy: dwidth*3.28, swidth: 185, sheight: 230},
    //             { sx: dwidth*1.06, sy: dwidth*3.28, swidth: 185, sheight: 230},
    //             { sx: dwidth*1.74, sy: dwidth*3.3, swidth: 184, sheight: 226},
    //             { sx: dwidth*.39, sy: dwidth*3.98, swidth: 182, sheight: 225},
    //             { sx: dwidth*1.06, sy: dwidth*3.98, swidth: 180, sheight: 226},
    //             { sx: dwidth*1.79, sy: dwidth*3.96, swidth: 180, sheight: 230},
    //         ]; 
    //         context.beginPath(); 
    //         context.moveTo(170, 100);
    //         context.lineTo(2, 160);
    //         context.lineTo(22, 430);
    //         context.lineTo(160, 560);
    //         context.lineTo(318, 432);
    //         context.lineTo(334, 165)
    //         context.closePath();
    //         context.clip();
    //         if(indexDices) {
    //             context.drawImage(drawImages, 
    //                 diceList[indexDices].sx, 
    //                 diceList[indexDices].sy, 
    //                 diceList[indexDices].swidth, 
    //                 diceList[indexDices].sheight, 0, 0, 
    //                 canvasElement.width, 
    //                 canvasElement.height
    //             );
    //         }else {
    //             context.drawImage(drawImages, 
    //                 diceList[0].sx, 
    //                 diceList[0].sy, 
    //                 diceList[0].swidth, 
    //                 diceList[0].sheight, 0, 0, 
    //                 canvasElement.width, 
    //                 canvasElement.height
    //             );
    //         }
    //         setImageShow(canvasElement);
    //     }
    // },[
    //     drawImages,
    //     indexDices
    // ]);

    return (
        <Group y={y} x={x}>
            <Image  
                image={drawImages}
                width={imageWidth}
                height={imageHeight}
                cornerRadius={5}
            />
        </Group>
    );
}

export default DiceImage