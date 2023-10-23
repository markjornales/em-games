'use client';  
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import FortuneRabbit from "../../200/FortuneRabbit";
import LottoGame10 from "../../10/LottoGame10";
import LottoGame20 from "../../20/LottoGame20";
import DiceRush20 from "../../20/DiceRush20";
import FlipJack20 from "../../20/FlipJack20";
import DiceRoller50 from "../../50/DiceRoller50";
import LottoGame50 from "../../50/LottoGame50";
import FruitBlast100 from "../../100/FruitBlast100";
import LottoGame100 from "../../100/LottoGame100";
import LuckySlots100 from "../../100/LuckySlots100";

const PageCanvas = dynamic(() => import("@/components/PageCanvas"), {
  ssr: false
});
const BalanceBar = dynamic(() => import("@/components/BalanceBar"));
const WarningModal = dynamic(() => import("@/components/WarningModal"))
const LottoGame = dynamic(() => import("@/app/games/200/LottoGame")); 
const BingoGame = dynamic(() => import("@/app/games/200/BingoGame"))
const GoldenCapricorn =dynamic(() => import("@/app/games/200/GoldenCapricorn"));

type THomePageParams = {
  category: string;
  name: string;
}

export default function Home({params}:{params: THomePageParams} ) {   
  const router = useRouter(); 

  switch(`${params.category}-${params.name}`){
    case "200-lottogame": 
      return (
        <PageCanvas>
          <BalanceBar balance_amount={12525222} time_played={152} />
          <LottoGame />
          <WarningModal />
        </PageCanvas>
      );
      case "200-bingo":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152} />
            <BingoGame />
            <WarningModal />
          </PageCanvas>
        );
      case "200-goldencapricorn":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152} />
            <GoldenCapricorn/>
            <WarningModal />
          </PageCanvas>
        );
      case "200-fortunerabbit": 
      return (
        <PageCanvas>
          <BalanceBar balance_amount={12525222} time_played={152}/>
           <FortuneRabbit/>
          <WarningModal/>
        </PageCanvas>
      );
      

      // 10 Cards !!!!!
      case  "10-lottogame":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <LottoGame10/>
            <WarningModal/>
          </PageCanvas>
          );
      
          

      // 20 Cards!!!
      case  "20-lottogame":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <LottoGame20/>
            <WarningModal/>
          </PageCanvas>
          );

      case  "20-dicerush":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <DiceRush20/>
            <WarningModal/>
          </PageCanvas>
          );

      case  "20-flipjack":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <FlipJack20/>
            <WarningModal/>
          </PageCanvas>
          );
      


      // 50 Cards !!!!
      case  "50-diceroller":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <DiceRoller50/>
            <WarningModal/>
          </PageCanvas>
          );

      case  "50-lotto50":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <LottoGame50/>
            <WarningModal/>
          </PageCanvas>
          );



      // 100 Cards !!!\
      case  "100-fruitblast":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <FruitBlast100/>
            <WarningModal/>
          </PageCanvas>
          );

      case  "100-lotto100":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <LottoGame100/>
            <WarningModal/>
          </PageCanvas>
          );

      case  "100-luckyslots":
        return (
          <PageCanvas>
            <BalanceBar balance_amount={12525222} time_played={152}/>
              <LuckySlots100/>
            <WarningModal/>
          </PageCanvas>
          );

      default:
        router.push('/games/not-found');
        return null;
  }

  
}


