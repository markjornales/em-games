
import dynamic from "next/dynamic";
import { TGameComponents } from "./page";



const LottoGame10 = dynamic(() => import("@/app/games/10/LottoGame10"));
const Busukpalawan = dynamic(() => import("@/app/games/10/Busukpalawan"));
const Dragonlucky = dynamic(() => import("@/app/games/10/Dragonlucky"));
const Jungleadventure = dynamic(() => import("@/app/games/10/Jungleadventure"));
const Luckybuddha = dynamic(() => import("@/app/games/10/Luckybuddha"));
const Panda = dynamic(() => import("@/app/games/10/Panda"));
const Scratchmatch = dynamic(() => import("@/app/games/10/Scratchmatch"));
const Spotcash = dynamic(() => import("@/app/games/10/Spotcash"));
const Superball = dynamic(() => import("@/app/games/10/Superball"));
const Easytwo = dynamic(() => import("@/app/games/10/Easytwo10"));
 
const routelist: TGameComponents = {
    "lottogame": <LottoGame10/>,
    "busukpalawan": <Busukpalawan/>,
    "dragonlucky": <Dragonlucky/>,
    "jungleadventure": <Jungleadventure/>,
    "luckybuddha": <Luckybuddha/>,
    "panda": <Panda/>,
    "scratchmatch": <Scratchmatch/>,
    "spotcash": <Spotcash/>,
    "superball": <Superball/>,
    "digitlottery" : <Easytwo/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`10-${values}`]: routelist[values]
})));
