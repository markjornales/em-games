
import dynamic from "next/dynamic";
import { TGameComponents } from "./page";
const LottoGame10 = dynamic(() => import("@/app/games/10/LottoGame10"));
 
const routelist: TGameComponents = {
    "lottogame": <LottoGame10/>
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`10-${values}`]: routelist[values]
})));
