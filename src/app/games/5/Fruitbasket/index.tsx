// fivecards
import CButton from '@/components/CButton'
import React from 'react'
import { Group } from 'react-konva'
import FruitBasketScratch from './FruitBasketScratch';

function Fruitbasket() {
    const scratchCardRef = React.useRef<any>();

    const handleButtonMain = () => {
        if (!scratchCardRef.current.isScratchDone) {
            alert('please Scratch first')
        } else {
            scratchCardRef.current.reset()
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
            <FruitBasketScratch
            ref={scratchCardRef}
            combinations={[
              [undefined, undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined], 
              ["cherry", undefined, undefined, undefined],
              [undefined, undefined, "cherry", undefined]
            ]}
          />
        </Group>
    )
}

export default Fruitbasket// fivecards