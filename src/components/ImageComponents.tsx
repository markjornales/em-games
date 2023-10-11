import React from "react";
import { Image } from "react-konva";

type TImageComponents =  {
    src: string;
    imageProps: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
      opacity?: number;
    }
  }
  
  export const ImageLoad = React.forwardRef(({src, imageProps}: TImageComponents, ref:any) => { 
    const [isImage, setImage] = React.useState<CanvasImageSource>();

    React.useEffect(() => {
      const img = new window.Image()
      img.src = src;
      setImage(img);
    },[src]);
    
    return (
      <Image 
        ref={ref} 
        image={isImage} 
        {...imageProps}
      />
    );
  });
  
  type TLoadingScratch = {
    src: string;
    width: number;
    height: number;
  }
  
  export const GifComponents = ({ src, height, width }: TLoadingScratch) => {
    const imageRef = React.useRef<any>(null);
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
          imageRef.current?.getLayer().draw();
        };
      });
     
    }, [src, canvas]);
  
    return (<Image 
        image={canvas} ref={imageRef} 
        width={width}
        height={height}
        
    />);
  };