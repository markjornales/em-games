import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import ImageFlip from '@/components/ImageFlip';
import React from 'react';
import { Group } from 'react-konva';
import ScratchGame, { TgameCombination } from './ScratchGames';

const gameCombination: TgameCombination= [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, true, false],
  [false, false, false, false, false],
];

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
        {isScratch? <ScratchGame gameCombination={gameCombination} ref={scratchCardRef}/>: <ImageFlip />} 
        <CButton label={isScratch? "NEXT CARD": ""} onclickStart={onclickStarts} />
      </Group>
    );
}

export default MainGames