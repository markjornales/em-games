
import dynamic from "next/dynamic";
import { TGameComponents } from "./page";

const LottoGame20 = dynamic(() => import("@/app/games/20/LottoGame20"));
const DiceRush20 = dynamic(() => import("@/app/games/20/DiceRush20"));
const FlipJack20 = dynamic(() => import("@/app/games/20/FlipJack20"));
const Baliindonisia = dynamic(() => import("@/app/games/20/Baliindonisia"));
const Bingo = dynamic(() => import("@/app/games/20/Bingo"));
const Mangobonanza = dynamic(() => import("@/app/games/20/Mangobonanza"));
const Spotcash = dynamic(() => import("@/app/games/20/Spotcash"));
const Stakessteeds = dynamic(() => import("@/app/games/20/Stakessteeds"));
const Superball = dynamic(() => import("@/app/games/20/Superball"));

const routelist: TGameComponents = {
    "lottogame": <LottoGame20/>,
    "dicerush": <DiceRush20/>, 
    "flipjack": <FlipJack20/>,
    "baliindonisia": <Baliindonisia/>,
    "bingo": <Bingo/>,
    "mangobonanza": <Mangobonanza/>,
    "spotcash": <Spotcash/>,
    "stakessteeds": <Stakessteeds/>,
    "superball": <Superball/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`20-${values}`]: routelist[values]
})));
