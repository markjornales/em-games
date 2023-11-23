import CButton from '@/components/CButton';
import { CanvasProvider } from '@/components/CanvasContext';
import React from 'react';
import { Group } from 'react-konva';
import ScratchGame, { TgameCombination } from './ScratchGames';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal")); 

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
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);  
  const onclickStarts = () => {
    setWarningShow(false);
    if(!scratchCardRef.current.isScratchDone) {
      setWarningShow(true) 
      } else {
        scratchCardRef.current.reset() //resets
      } 
  }

    return (
      <Group>
        <CButton onfastscratch={() => {
           if(!scratchCardRef.current.isScratchDone){
            scratchCardRef.current.fastscratch();   
          } 
        }} label="NEXT CARD" url_path="hundredto" onclickStart={onclickStarts} /> 
          <ScratchGame 
            gameCombination={gameCombination} 
            ref={scratchCardRef}
          />  
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
      </Group>
    );
}

export default MainGames