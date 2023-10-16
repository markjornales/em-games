import React from "react";
import { Image } from "react-konva";


type PickedImage = "width" | "height" | "opacity" | "x" | "y" | "onPointerDown"| "onPointerUp" | "cornerRadius";
type PickOtherImage = "scale" | "scaleX" | "scaleY" | "offsetX" | "offsetY" | "visible" | "rotation" | "ref"
type TImageComponents =  {
    src: string;
    imageProps: Pick<React.ComponentProps<typeof Image>, PickedImage | PickOtherImage>
}

export const ImageLoad = ({src, imageProps}: TImageComponents) => { 
    const [isImage, setImage] = React.useState<CanvasImageSource>();
    React.useEffect(() => {
      const img = new window.Image()
      img.src = src;
      setImage(img);
    },[src]);
    
    return (
      <Image image={isImage} {...imageProps}/>
    );
  };
  
  type TLoadingScratch = {
    src: string;
    width: number;
    height: number;
  }
  
  export const GifComponents = ({ src, height, width }: TLoadingScratch) => {
    const imageRef = React.useRef<React.ComponentRef<typeof Image>>(null);
    const canvas = React.useMemo(() => {
      const node = document.createElement("canvas");
      return node;
    }, []);
  
    React.useEffect(() => { 
      let anim: any;
      window.gifler(src).get((a: any) => {
        anim = a;
        anim.animateInCanvas(canvas);
        anim.onDrawFrame = (ctx: any, frame: any) => {
          ctx.drawImage(frame.buffer, frame.x, frame.y);
          imageRef.current?.getLayer()?.draw();
        };
      });
     
    }, [src, canvas]);
  
    return (<Image 
        image={canvas} ref={imageRef} 
        width={width}
        height={height}
        
    />);
  };