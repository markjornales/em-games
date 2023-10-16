import BalanceBar from '@/components/BalanceBar';
import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import ImageFlip from '@/components/ImageFlip'; 
import React from 'react';
import { Group } from 'react-konva';
import ScratchGames from './ScratchGames';
import WarningModal from '@/components/WarningModal';


function MainGames() {
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize;
  const [isScratch, setScratch] = React.useState<boolean>(false);
  const scratchCardRef = React.useRef<any>()

  const onclickStarts = () => {
    if(isScratch) {
      if(!scratchCardRef.current.isScratchDone) {
        alert('please Scratch first')
      } else {
        scratchCardRef.current.reset() 
      }
      return;
    }
    setScratch(true);
  }

    return (
      <Group>
        <BalanceBar balance_amount={12525222} time_played={152} />
        {/* {isScratch? <ScratchGames ref={scratchCardRef}/>: <ImageFlip />} */}
        <ScratchGames/>
        <CButton label={isScratch? "NEXT CARD": ""} onclickStart={onclickStarts} />
        {/* <WarningModal/> */}
      </Group>
    );
}

export default MainGames