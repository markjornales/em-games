import { ImageLoad } from '@/components/ImageComponents';
import { animated, Spring } from "@react-spring/konva";
import { Group } from "react-konva";

type TAnimateEmperor = {
    width: number;
    height: number; 
}
const GroupImage:any = animated(Group);

function AnimateEmperor(props: TAnimateEmperor) {
   const { height, width} = props; 
    return (
      <Spring 
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        delay={1500}>
        {(props) => 
          <GroupImage opacity={props.opacity}>
            <ImageLoad
                src="/images/e_crown.png"
                imageProps={{
                    x: (width - (width *.56))/2,
                    y: width * .35,
                    width: width * .56,
                    height: width * .11, 
                }}
            />
          </GroupImage>
        }
    </Spring>
  )
}

export default AnimateEmperor