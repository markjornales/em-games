import dynamic from "next/dynamic";
import { TGameComponents } from "./page";

const DiceRoller50 = dynamic(() => import("@/app/games/50/DiceRoller50"));
const LottoGame50 = dynamic(() => import("@/app/games/50/LottoGame50"));

 
const routelist: TGameComponents = {
    "diceroller": <DiceRoller50/>, 
    "lotto": <LottoGame50/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`50-${values}`]: routelist[values]
})));
