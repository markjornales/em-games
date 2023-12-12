
import dynamic from "next/dynamic";
import { TGameComponents } from "./page";

const Bohol = dynamic(() => import("@/app/games/5/Bohol")); 
const Carshow = dynamic(() => import("@/app/games/5/Carshow")); 
const Fruitbasket = dynamic(() => import("@/app/games/5/Fruitbasket")); 
const Galacticgambit = dynamic(() => import("@/app/games/5/Galacticgambit")); 
const Goldenbuddha = dynamic(() => import("@/app/games/5/Goldenbuddha")); 
const Lovering = dynamic(() => import("@/app/games/5/Lovering")); 
const Spotcash = dynamic(() => import("@/app/games/5/Spotcash")); 
const Treasurehunt = dynamic(() => import("@/app/games/5/Treasurehunt")); 
const Yearsnake = dynamic(() => import("@/app/games/5/Yearsnake")); 
const  Easytwo = dynamic(() => import("@/app/games/5/Easytwo5")); 
 
const routelist: TGameComponents = {
    "bohol": <Bohol/>, 
    "carshow": <Carshow/>, 
    "fruitbasket": <Fruitbasket/>, 
    "galacticgambit": <Galacticgambit/>, 
    "goldenbuddha": <Goldenbuddha/>, 
    "lovering": <Lovering/>, 
    "spotcash": <Spotcash/>, 
    "treasurehunt": <Treasurehunt/>, 
    "yearsnake": <Yearsnake/>, 
    "digitlottery" : <Easytwo/>,
}

export default Object.assign({}, ...Object.keys(routelist).map((values) => ({
    [`5-${values}`]: routelist[values]
})));
