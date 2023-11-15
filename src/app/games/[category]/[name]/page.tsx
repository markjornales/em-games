'use client';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import Fifty from "./Fifty";
import Onehundred from "./Onehundred";
import Ten from "./Ten";
import Five from "./Five";
import Twenty from "./Twenty";
import Twohundred from "./Twohundred";


type THomePageParams = {
  params: {
    category: string;
    name: string;
  }
}
type TRenderGame = {
  gameComponents: JSX.Element
}
export type TGameComponents = {
  [key: string]: JSX.Element
}

const PageCanvas = dynamic(() => import("@/components/PageCanvas"), {
  ssr: false
});

const WarningModal = dynamic(() => import("@/components/WarningModal"));
const BalanceBar = dynamic(() => import("@/components/BalanceBar"));

export default function Home ({params}: THomePageParams) {
  
  const router = useRouter(); 
  const gameComponents: TGameComponents = Object.assign({}, Five, Twohundred, Onehundred, Fifty, Twenty, Ten);
  const gameKey = `${params.category}-${params.name}`;

  if(gameComponents[gameKey]){
    return renderGame({
      gameComponents: gameComponents[gameKey]
    });
  } else {
    router.push('/games/not-found');
    return null;
  }
}

function renderGame({gameComponents}: TRenderGame) {
  return (
    <PageCanvas>
       <BalanceBar balance_amount={52629} time_played={152}/>
          {gameComponents}
       {/* <WarningModal textstring="This game will cannot be played by 18 years old and below."/> */}
    </PageCanvas> 
  );
}
