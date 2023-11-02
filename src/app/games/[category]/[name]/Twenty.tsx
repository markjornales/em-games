
import dynamic from "next/dynamic";
import { TGameComponents } from "./page";

const LottoGame20 = dynamic(() => import("@/app/games/20/LottoGame20"));
const DiceRush20 = dynamic(() => import("@/app/games/20/DiceRush20"));
const FlipJack20 = dynamic(() => import("@/app/games/20/FlipJack20"));

const routelist: TGameComponents = {
    "lottogame": <LottoGame20/>,
    "dicerush": <DiceRush20/>, 
    "flipjack": <FlipJack20/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`20-${values}`]: routelist[values]
})));
