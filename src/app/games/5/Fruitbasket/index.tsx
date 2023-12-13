// fivecards
import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import FruitBasketScratch from './FruitBasketScratch';
import dynamic from 'next/dynamic';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';
import { useSearchParams } from 'next/navigation';
import { BingoBonanzaClass } from '@/hooks/methods';
import { afterScratchAuth, authentications } from '@/api/API';

const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Fruitbasket() {
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
        {strawberry: 1, avocado: 0, cherry: 0, banana: 0, apple: 0}, 
        {strawberry: 0, avocado: 1, cherry: 0, banana: 0, apple: 0}, 
        {strawberry: 0, avocado: 0, cherry: 0, banana: 1, apple: 0}, 
        {strawberry: 0, avocado: 0, cherry: 0, banana: 0, apple: 1}, 
        {strawberry: 0, avocado: 2, cherry: 0, banana: 0, apple: 0}, 
        {strawberry: 0, avocado: 0, cherry: 0, banana: 2, apple: 0}, 
        {strawberry: 0, avocado: 0, cherry: 0, banana: 0, apple: 2}, 
        {strawberry: 0, avocado: 0, cherry: 2, banana: 0, apple: 0}, 
      ];
      const bingobonanza = new BingoBonanzaClass({
        combi: isCardScratch.combi, 
        cols: 4, 
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
            url_path="fivecards" 
            onfastscratch={onfastscratch} 
            onclickStart={handleButtonMain}/>
            <FruitBasketScratch
             ref={scratchCardRef}  
             reference={isCardScratch.refno} 
             combinations={combination} 
             scratchdone={onScratchDone}
          />
           {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
        </Group>
    )
}

export default Fruitbasket// fivecards