'use client';  
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const PageCanvas = dynamic(() => import("@/components/PageCanvas"), {
  ssr: false
});
const BalanceBar = dynamic(() => import("@/components/BalanceBar"));
const WarningModal = dynamic(() => import("@/components/WarningModal"))
const LottoGame = dynamic(() => import("@/app/games/200/LottoGame")); 

type THomePageParams = {
  category: string;
  name: string;
}

export default function Home({params}:{params: THomePageParams} ) {   
  const router = useRouter();
  if(!(params.category == "200" && params.name == "lottogame")) {
      router.push('/games/not-found');
  }
  
  return (
        <PageCanvas>
           <BalanceBar balance_amount={12525222} time_played={152} />
            {params.category == "200" && params.name == "lottogame" && <LottoGame/>}
          <WarningModal/>
        </PageCanvas>
      )
}
