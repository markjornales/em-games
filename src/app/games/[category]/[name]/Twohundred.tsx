
import dynamic from "next/dynamic"; 
import { TGameComponents } from "./page";
const LottoGame = dynamic(() => import("@/app/games/200/LottoGame")); 
const BingoGame = dynamic(() => import("@/app/games/200/BingoGame"))
const GoldenCapricorn = dynamic(() => import("@/app/games/200/GoldenCapricorn"));
const FortuneRabbit = dynamic(() => import("@/app/games/200/FortuneRabbit"));
const GollapGlory = dynamic(() => import("@/app/games/200/GollapGlory"));
const CasinoJoker = dynamic(() => import("@/app/games/200/CasinoJoker"));
const LuckyJack = dynamic(() => import("@/app/games/200/LuckyJack"));
const ThailandBangkok = dynamic(() => import("@/app/games/200/ThailandBangkok"));
const SuperBall = dynamic(() => import("@/app/games/200/SuperBall"));
const Easytwo = dynamic(() => import("@/app/games/200/Easytwo200"));
 

const routelist: TGameComponents = {
    "lottogame": <LottoGame/>,
    "bingo": <BingoGame/>,
    "goldencapricorn": <GoldenCapricorn/>,
    "fortunerabbit": <FortuneRabbit/>,
    "gollapglory": <GollapGlory/>,
    "casinojoker": <CasinoJoker/>,
    "luckyjack": <LuckyJack/>,
    "bangkokthailand": <ThailandBangkok/>,
    "superball": <SuperBall/>,
    "digitlottery" : <Easytwo/>,
};
 
export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`200-${values}`]: routelist[values]
})));
