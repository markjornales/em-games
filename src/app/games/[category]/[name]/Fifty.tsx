import dynamic from "next/dynamic";
import { TGameComponents } from "./page";

const DiceRoller50 = dynamic(() => import("@/app/games/50/DiceRoller50"));
const LottoGame50 = dynamic(() => import("@/app/games/50/LottoGame50"));
const Bacarat = dynamic(() => import("@/app/games/50/Bacarat"));
const Bingo = dynamic(() => import("@/app/games/50/Bingo"));
const Casino = dynamic(() => import("@/app/games/50/Casino"));
const Riderfortune = dynamic(() => import("@/app/games/50/Riderfortune"));
const Spotcash = dynamic(() => import("@/app/games/50/Spotcash"));
const Superball = dynamic(() => import("@/app/games/50/Superball"));
const USA = dynamic(() => import("@/app/games/50/USA")); 
const Easytwo = dynamic(() => import("@/app/games/50/Easytwo50")); 

 
const routelist: TGameComponents = {
    "diceroller": <DiceRoller50/>, 
    "lotto": <LottoGame50/>,
    "bacarat" : <Bacarat/>,
    "bingobonanza": <Bingo/>,
    "casino": <Casino/>,
    "riderfortune": <Riderfortune/>,
    "spotcash": <Spotcash/>,
    "superball": <Superball/>,
    "usa": <USA/>, 
    "digitlottery" : <Easytwo/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`50-${values}`]: routelist[values]
})));
