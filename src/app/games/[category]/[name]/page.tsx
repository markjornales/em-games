'use client';
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';  

type THomePageParams = {
  params: {
    category: string;
    name: string;
  }
}
type TRenderGame = {
  gameComponents: JSX.Element
}
type TGameComponents = {
  [key: string]: JSX.Element
}

const PageCanvas = dynamic(() => import("@/components/PageCanvas"), {
  ssr: false
});

const BalanceBar = dynamic(() => import("@/components/BalanceBar"));
const WarningModal = dynamic(() => import("@/components/WarningModal"));
const LottoGame = dynamic(() => import("@/app/games/200/LottoGame")); 
const BingoGame = dynamic(() => import("@/app/games/200/BingoGame"))
const GoldenCapricorn = dynamic(() => import("@/app/games/200/GoldenCapricorn"));
const FortuneRabbit = dynamic(() => import("@/app/games/200/FortuneRabbit"));
const LottoGame10 = dynamic(() => import("@/app/games/10/LottoGame10"));
const LottoGame20 = dynamic(() => import("@/app/games/20/LottoGame20"));
const DiceRush20 = dynamic(() => import("@/app/games/20/DiceRush20"));
const FlipJack20 = dynamic(() => import("@/app/games/20/FlipJack20"));
const DiceRoller50 = dynamic(() => import("@/app/games/50/DiceRoller50"));
const LottoGame50 = dynamic(() => import("@/app/games/50/LottoGame50"));
const FruitBlast100 = dynamic(() => import("@/app/games/100/FruitBlast100"));
const LottoGame100 = dynamic(() => import("@/app/games/100/LottoGame100"));
const LuckySlots100 = dynamic(() => import("@/app/games/100/LuckySlots100"));

export default function Home ({params}: THomePageParams) {
  const router = useRouter(); 

  const gameComponents: TGameComponents = {
    "200-lottogame": <LottoGame/>, // check
    "200-bingo": <BingoGame/>, // unfinish
    "200-goldencapricorn": <GoldenCapricorn/>, //check
    "200-fortunerabbit": <FortuneRabbit/>, // check
    "10-lottogame": <LottoGame10/>, // check 
    "20-lottogame": <LottoGame20/>, // check
    "20-dicerush": <DiceRush20/>, //check
    "20-flipjack": <FlipJack20/>,
    "50-diceroller": <DiceRoller50/>,
    "50-lotto50": <LottoGame50/>,
    "100-fruitblast": <FruitBlast100/>, // check
    "100-lotto100": <LottoGame100/>,
    "100-luckyslots": <LuckySlots100/>,
  };
  
  const gameKey = `${params.category}-${params.name}`;
  
  if(gameComponents[gameKey]){
    return renderGame({
      gameComponents: gameComponents[gameKey]
    });
  }else {
    router.push('/games/not-found');
    return null;
  }
}

function renderGame({gameComponents}: TRenderGame) {
  return (
    <PageCanvas>
       <BalanceBar balance_amount={52629} time_played={152}/>
          {gameComponents}
       {/* <WarningModal/> */}
    </PageCanvas> 
  );
}
