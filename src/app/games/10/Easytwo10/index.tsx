import { afterScratchAuth, authentications } from '@/api/API';
import CButton from '@/components/CButton'
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { EasyTwoDigitMethod, GridBooleansCards } from '@/hooks/methods';         
import { useSearchParams } from 'next/navigation';  
import React from 'react'
import { Group } from 'react-konva'
import EasyScratch from './EasyScratch';
import dynamic from 'next/dynamic';

const WarningModal = dynamic(() => import("@/components/WarningModal"));


function Easytwo10() {
    const scratchCardRef = React.useRef<any>()
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);  
    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);   
    const [is_reset, set_reset] = React.useState<boolean>(false);
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!;  
    const combination = React.useMemo(() =>{
        const colorLists = ["red", "blue", "green", "violet", "yellow"]
        const prizeLists = ['5', '10', '50', '100', '500', '1K', '10K', '100k']
        const methodEasy = new EasyTwoDigitMethod({colorLists, combi: isCardScratch.combi, prizeLists})
        return methodEasy.get()
    },[isCardScratch.combi, is_reset]);


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
            <EasyScratch
               ref ={scratchCardRef}
               reference={isCardScratch.refno}  
               combination={combination}
               scratchdone={onScratchDone}  
            />
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
        </Group>
    )
}

export default Easytwo10