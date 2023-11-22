import APIHandlerPost from '@/api/API';
import { CanvasContext, CanvasProvider, TCardScratchProp } from '@/components/CanvasContext';
import { ImageLoad } from '@/components/ImageComponents';
import Konva from 'konva';
import { Poppins } from 'next/font/google';
import React from 'react';
import { Group, Text } from 'react-konva';
import { useSearchParams } from 'next/navigation';


const poppins = Poppins({
    subsets: ["latin"],
    weight: "600"
  });
  
function ProgressBar() {
  const searchparams = useSearchParams();
  const search = searchparams.get("q")!;
  const { isCanvasSize, setAuthenticated, setCardScratch } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;
    const refText = React.useRef<any>();  
    const [isProgress, setProgress] = React.useState<number>(0);
    const { setPlayed } = React.useContext(CanvasContext);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    const bar_width = width * .45;
    const bar_heigth = width* .05;
    const minbarX = bar_width *.03
    const maxbarX = (bar_width - width*.019) - minbarX
 
    React.useEffect(() => { 
      let minbarx = parseFloat(minbarX.toFixed(2));
      const frameAnimation = new Konva.Animation(() => {
        minbarx ++;
        const progress = Math.min(minbarx, 100);
        const progessbarwidth = (maxbarX * progress) / 100
        setProgress(Math.floor(progessbarwidth - 4));
        if((progessbarwidth + 3) > maxbarX) {
          setLoading(false);
          frameAnimation.stop();
          setTimeout(() => authentications(), 500)
        }
      })
      frameAnimation.start();
    },[]);

    const authentications = async () => { 
      try {
        const response = await APIHandlerPost({ 
          qUid: search, 
          dataParams: {
            card_id: 5,
            user_id: 1,
            category: null
        }});  
        if(!response.ok && response.status_code == 0) { 
          if(response.status === 401) {
            throw {
              message: "Unauthorize Login, to access this feature, please log in to your account.",
              status: 401
            }
          } 
        }else { 
          setCardScratch(JSON.parse(response.scratch))
          setPlayed(true);
        }
      } catch (error: any) {  
        if(error.status == 401) {
          setAuthenticated({
            authenticate: false, 
            message: error.message
          })  
        } 
      } 
    }


  return (
    <Group x={(width-(width*.45))/2} y={height*.8}>
        <Group height={bar_heigth} width={bar_width}>
          <ImageLoad src="/images/load_bar.png" 
              imageProps={{ 
              width: width*.45,
              height: width*.05, 
            }}
            
          />
          {Array.from(new Array(isProgress)).map((_, i) => 
            <ImageLoad 
            key={i}
            src="/images/bar_loader.png"
            imageProps={{
              height: width*.025,
              width: width*.025,
              y: (bar_heigth - (width*.025))/2,
              x: minbarX + i
            }}
          />)}
        </Group> 
        <Group 
          y={bar_heigth + 10} > 
            <Text   
                fill="white"
                fontSize={24}
                fontFamily={poppins.style.fontFamily}
                text={"Loading"}
                width={bar_width}  
                height={bar_heigth}
                align="center"
            />
        </Group>
  </Group>
  )
}

export default ProgressBar