import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { BingoBonanzaClass } from '@/hooks/methods';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Group } from 'react-konva';
import MangoScratch from './MangoScratch';

const WarningModal = dynamic(() => import("@/components/WarningModal"));
function Mangobonanza() {
  const scratchCardRef = React.useRef<any>()
  const [isWarningShow, setWarningShow] = React.useState<boolean>(false);
  const { setPlayed } = React.useContext(CanvasContext);     
  const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
  const searchparams = useSearchParams(); 
  const search = searchparams.get("q")!;
  const gid = searchparams.get("gid")!;  
  const [is_reset, set_reset] = React.useState<boolean>(false);
  const combination = React.useMemo(() => {
    const prizeLegend = [
      {apple: 1, melon: 0, orange: 0, grape: 0, mango: 0},
      {apple: 0, melon: 1, orange: 0, grape: 0, mango: 0},
      {apple: 0, melon: 0, orange: 1, grape: 0, mango: 0},
      {apple: 0, melon: 0, orange: 0, grape: 1, mango: 0},
      {apple: 0, melon: 0, orange: 0, grape: 0, mango: 1},
      {apple: 3, melon: 0, orange: 0, grape: 0, mango: 0},
      {apple: 0, melon: 3, orange: 0, grape: 0, mango: 0},
      {apple: 0, melon: 0, orange: 3, grape: 0, mango: 0},
      {apple: 0, melon: 0, orange: 0, grape: 3, mango: 0},
      {apple: 0, melon: 0, orange: 0, grape: 0, mango: 3},
    ];
    const bingobonanza = new BingoBonanzaClass({
      combi: isCardScratch.combi, 
      cols: 3, 
      rows: 4,
      prizeLegend
    });
    return bingobonanza.getValues();
  }, [isCardScratch.combi, is_reset]);
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
        set_reset((e) => !e) 
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
         url_path="twentycards" 
         onfastscratch={onfastscratch} 
         onclickStart={handleButtonMain}/> 
          <MangoScratch 
            ref={scratchCardRef}  
            reference={isCardScratch.refno} 
            combination={combination} 
            scratchdone={onScratchDone}
            />
        {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
    </Group>
  )
}

export default Mangobonanza