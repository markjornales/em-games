// fivecards
import { authentications } from '@/api/API'; // eto
import CButton from '@/components/CButton';

// -- eto siya dapat ilagay
import { CanvasContext, CanvasProvider } from '@/components/CanvasContext';     
import { GridBooleansCards } from '@/hooks/functions';         
import { useSearchParams } from 'next/navigation';                
//------/>

import React from 'react';
import { Group } from 'react-konva';
import BoholScratch from './BoholScratch'; 
import dynamic from 'next/dynamic';
const WarningModal = dynamic(() => import("@/components/WarningModal"));

function Bohol() {
    const scratchCardRef = React.useRef<any>();

     // -- eto siya dapat ilagay
    const { setPlayed } = React.useContext(CanvasContext);     
    const  { setAuthenticated, setCardScratch, isCardScratch } = React.useContext(CanvasProvider);    
   // --- />

    const [isWarningShow, setWarningShow] = React.useState<boolean>(false);

    // -- eto siya dapat ilagay
    const searchparams = useSearchParams(); 
    const search = searchparams.get("q")!;
    const gid = searchparams.get("gid")!; 
    // -- />

    const handleButtonMain = () => {
        setWarningShow(false);
        if (!scratchCardRef.current.isScratchDone) {
            setWarningShow(true)
        } else {

            // --- eto siya dapat ilagay
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
            //-- 
        }
    }

    return (
        <Group>
            <CButton 
            label="NEXT CARD" 
            url_path="fivecards"
            onfastscratch={() =>{
                if(!scratchCardRef.current.isScratchDone){
                    scratchCardRef.current.fastscratch();    
                } 
            }}  
            onclickStart={handleButtonMain} />
            <BoholScratch 
                ref={scratchCardRef} 
                //eto siya dapat ilagay
                reference={isCardScratch.refno}
                popupwinners={[0,1,2,3,4,5,7,9,12][isCardScratch.combi.replace(/[^1]/g, '').length]}  
                combination={new GridBooleansCards({ 
                    columns: 3, 
                    combi: isCardScratch.combi, 
                    rows: 3 
                }).getValues()}
                // -----
            /> 
            {isWarningShow && <WarningModal textstring="Please Scratch first"/>} 
        </Group>
    )
}

export default Bohol