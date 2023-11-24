import CButton from '@/components/CButton'
import { Group } from 'react-konva' 
import BingoScratch from './BingoScratch';
import React from "react";
import dynamic from 'next/dynamic';
import { BingoScratchClass } from '@/hooks/functions';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { authentications } from '@/api/API';

const WarningModal = dynamic(() => import("@/components/WarningModal"));


function BingoGame() {
  const scratchCardRef = React.useRef<any>();
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false); 
  const { setPlayed } = React.useContext(CanvasContext);
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!; 
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

  return (
    <Group>
         <CButton onfastscratch={() =>{
              if(!scratchCardRef.current.isScratchDone){
                  scratchCardRef.current.fastscratch();   
              } 
            }}  label="NEXT CARD" url_path="hundredto"  onclickStart={handleButtonMain} />
         <BingoScratch 
            reference={isCardScratch.refno}
            popupwinners={[0,1,2,3,4,5,7,8,8,17][isCardScratch.combi.replace(/[^1]/g, '').length]} 
            ref={scratchCardRef} 
            combination={new BingoScratchClass({combi: isCardScratch.combi}).getValue()}
          />
         {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
     </Group>
  );
}

export default BingoGame