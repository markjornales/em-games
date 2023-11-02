
import dynamic from "next/dynamic";

const FruitBlast100 = dynamic(() => import("@/app/games/100/FruitBlast100"));
const LottoGame100 = dynamic(() => import("@/app/games/100/LottoGame100"));
const LuckySlots100 = dynamic(() => import("@/app/games/100/LuckySlots100"));

type TRoutelist = {
    [key: string]: JSX.Element;
}

const routelist: TRoutelist = {
    "fruitblast": <FruitBlast100/>,
    "lotto": <LottoGame100/>,
    "luckyslots": <LuckySlots100/>,    
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`100-${values}`]: routelist[values]
})));
