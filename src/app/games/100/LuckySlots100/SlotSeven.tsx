import React from 'react'
import { Group, Image } from 'react-konva'
import useImage from 'use-image';
 

type TSlotSeven = {
  width: number;
  height: number;
  slotsname: "dollar"|"seven"
  slotHeight: number;
  slotWidth: number;
}

function SlotSeven(props: TSlotSeven) {
  const { height, width, slotsname, slotHeight, slotWidth} = props;
  const [imageRender] = useImage("/images/100/luckyslots/front.png");
  const [isCanvasImage, setCanvasImage] = React.useState<HTMLCanvasElement>();

  React.useEffect(() => {
    if(imageRender){
      const canvasElement = document.createElement("canvas");
      const context = canvasElement.getContext("2d")!;
      canvasElement.width = width;
      canvasElement.height = height;
      const slots = {
        dollar:{sx: width*.43, sy: width*3.12, swidth: 140, sheight: 140},
        seven:{sx: width*.7, sy: width*1.83, swidth: 90, sheight: 90},
      }
      context.beginPath(); 
      if(slotsname == "dollar"){
        context.moveTo(170, 80); 
        context.bezierCurveTo(0, 120, 20, 500, 170, 521);
        context.bezierCurveTo(376, 480, 310, 63, 170, 80); 
      } else {
        context.moveTo(115, 180);
        context.lineTo(260, 180);
        context.lineTo(260, 242);
        context.bezierCurveTo(200, 310, 192, 460, 193, 494);
        context.lineTo(145, 494);
        context.bezierCurveTo(145, 490, 156, 330, 190, 275);
        context.lineTo(115, 275);
        context.lineTo(115, 180);
      }
      context.clip();
      context.closePath();
      context.drawImage(imageRender, 
          slots[slotsname].sx, 
          slots[slotsname].sy, 
          slots[slotsname].swidth, 
          slots[slotsname].sheight, 0, 0, 
          canvasElement.width, 
          canvasElement.height
      );
      setCanvasImage(canvasElement);
    }
  },[imageRender, slotsname]);

  return ( 
    <Image
      image={isCanvasImage}
      width={slotWidth}
      height={slotHeight}
    /> 
  );
}

export default SlotSeven