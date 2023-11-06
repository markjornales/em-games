
import dynamic from "next/dynamic";  

const FruitBlast100 = dynamic(() => import("@/app/games/100/FruitBlast100"));
const LottoGame100 = dynamic(() => import("@/app/games/100/LottoGame100"));
const LuckySlots100 = dynamic(() => import("@/app/games/100/LuckySlots100"));
const Burjkhalifa = dynamic(() => import("@/app/games/100/Burjkhalifa"));
const Horses = dynamic(() => import("@/app/games/100/Horses"));
const Pocker = dynamic(() => import("@/app/games/100/Pocker"));
const Roulette = dynamic(() => import("@/app/games/100/Roulette"));
const Spotcash = dynamic(() => import("@/app/games/100/Spotcash"));
const Superball = dynamic(() => import("@/app/games/100/Superball"));

type TRoutelist = {
    [key: string]: JSX.Element;
}

const routelist: TRoutelist = {
    "fruitblast": <FruitBlast100/>,
    "lotto": <LottoGame100/>,
    "luckyslots": <LuckySlots100/>,
    "burjkhalifa": <Burjkhalifa/>,
    "horses": <Horses/>,
    "pocker": <Pocker/>,
    "roulette": <Roulette/>,
    "spotcash": <Spotcash/>,
    "superball": <Superball/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`100-${values}`]: routelist[values]
})));
