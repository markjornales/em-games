import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { GridBooleansCards } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import ScratchGame from './ScratchGames';

const WarningModal = dynamic(() => import("@/components/WarningModal"));   
function MainGames() {
  const {  setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider); 
  const scratchCardRef = React.useRef<any>() 
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);  
  const { setPlayed } = React.useContext(CanvasContext); 
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!; 
  const combinations = React.useMemo(() => 
      new GridBooleansCards({ rows: 5, columns: 4, combi: isCardScratch.combi, })
      .getValues(), 
  [isCardScratch.combi]);

  const handleButtonMain = () => {
      setWarningShow(false);
      if(!scratchCardRef.current.isScratchDone) {
          setWarningShow(true)
        } else {
          authentications({ 
              setAuthenticated, 
              setCardScratch, 
              setPlayed, 
              searchparams, 
              search, 
              gid 
          })
          .then(() => {
              scratchCardRef.current.reset();
          });
      } 
  }
  const onfastscratch = () => {
      if(!scratchCardRef.current.isScratchDone){
       scratchCardRef.current.fastscratch();   
     } 
  }

  const onScratchDone = (done: boolean) => {
      if(done) {
        afterScratchAuth({ 
          gid,
          search, 
          searchparams, 
          setAuthenticated, 
          setCardScratch, 
          setPlayed, 
        });
      }
  }

    return (
      <Group>
        <CButton 
            label="NEXT CARD" 
            url_path="hundredto"
            onfastscratch={onfastscratch} 
            onclickStart={handleButtonMain} 
          /> 
          <ScratchGame 
            gameCombination={combinations} 
            reference={isCardScratch.refno}
            ref={scratchCardRef}
            scratchdone={onScratchDone} 
          />  
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
      </Group>
    );
}

export default MainGames