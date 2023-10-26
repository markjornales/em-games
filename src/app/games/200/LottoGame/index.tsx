import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import ImageFlip from '@/components/ImageFlip';
import React from 'react';
import { Group } from 'react-konva';
import ScratchGame, { TgameCombination } from './ScratchGames';

const gameCombination: TgameCombination= [
  [false, false, false, false, false],
  [false, false, true, false, false],
  [false, false, false, false, false],
  [false, true, false, false, false],
];

function MainGames() {
  const { isCanvasSize } = React.useContext(CanvasProvider);
  const { height, width } = isCanvasSize; 
  const scratchCardRef = React.useRef<any>()

  const onclickStarts = () => {
    if(!scratchCardRef.current.isScratchDone) {
        alert('please Scratch first')
      } else {
        scratchCardRef.current.reset() //resets
      } 
  }

    return (
      <Group>
        <CButton label="NEXT CARD" onclickStart={onclickStarts} /> 
          <ScratchGame 
            gameCombination={gameCombination} 
            ref={scratchCardRef}
          />  
      </Group>
    );
}

export default MainGames