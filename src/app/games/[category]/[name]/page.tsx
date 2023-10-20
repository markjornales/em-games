'use client';  
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

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
        )
      default:
        router.push('/games/not-found');
        return null;
  }

  
}
