import CButton from '@/components/CButton'
import { afterScratchAuth, authentications } from '@/api/API';
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { BingoBonanzaClass, GridBooleansCards } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation'; 
import React from 'react'
import { Group } from 'react-konva'
import LuckybuddhaScratch from './LuckybuddhaScratch';
import dynamic from 'next/dynamic';
import { TCoinname } from './Dollar';

const WarningModal = dynamic(() => import("@/components/WarningModal"));


function Luckybuddah() {
    const scratchCardRef = React.useRef<any>()
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);   
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  
    const combination = React.useMemo(() => {
      const prizeLegend = [
        {"5": 3, "10": 0, "50": 0, "100": 0, "500": 0, "1k": 0, "10k": 0, "100k": 0},
        {"5": 0, "10": 3, "50": 0, "100": 0, "500": 0, "1k": 0, "10k": 0, "100k": 0},
        {"5": 0, "10": 0, "50": 3, "100": 0, "500": 0, "1k": 0, "10k": 0, "100k": 0},
        {"5": 0, "10": 0, "50": 0, "100": 3, "500": 0, "1k": 0, "10k": 0, "100k": 0},
        {"5": 0, "10": 0, "50": 0, "100": 0, "500": 3, "1k": 0, "10k": 0, "100k": 0},
        {"5": 0, "10": 0, "50": 0, "100": 0, "500": 0, "1k": 3, "10k": 0, "100k": 0},
        {"5": 0, "10": 0, "50": 0, "100": 0, "500": 0, "1k": 0, "10k": 3, "100k": 0},
        {"5": 0, "10": 0, "50": 0, "100": 0, "500": 0, "1k": 0, "10k": 0, "100k": 3},
      ];
      const coinname:TCoinname[] = ['5', '10', '50', '100', '500', '1k', '10k', '100k'] 
      const combis = isCardScratch.combi.replace(/[^1]/g, '').length - 1
      const duplicate:TCoinname[] =  combis > 0 ? [...new Array(3).fill(coinname[combis]).map((e) => e)]: [];
      
      const results = new BingoBonanzaClass({combi: isCardScratch.combi, cols: 3, rows: 3, prizeLegend}).getValues()
      for(let x = 0; x < results.length; x ++) {
        for(let y=0; y< results[x].length; y ++){
            let randomcoin = coinname[Math.floor(Math.random() * coinname.length)]
            const find = duplicate.filter((e) => e == randomcoin)?.length || 0 
            if(find < 2 ) { 
                duplicate.push(randomcoin) 
                results[x][y] = results[x][y] || randomcoin;
            }else {
              y--;
            } 
        }
      } 
      return results 
    },[isCardScratch.combi]);

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
            url_path="tencards" 
            onfastscratch={onfastscratch} 
            onclickStart={handleButtonMain}/>
            <LuckybuddhaScratch ref={scratchCardRef}
               reference={isCardScratch.refno}  
               combination={combination}
               scratchdone={onScratchDone}
            />
             {isWarningShow && <WarningModal textstring="Please Scratch first"/>}
        </Group>
    )
}

export default Luckybuddah