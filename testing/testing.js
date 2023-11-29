const pockerPrizeLegend = [
    {pocker: "clubs", pcs: 1},
    {pocker: "clubs", pcs: 2},
    {pocker: "heart", pcs: 3},
    {pocker: "heart", pcs: 4},
    {pocker: "spades", pcs: 3},
    {pocker: "spades", pcs: 5},
    {pocker: "diamond", pcs: 5},
];
const combi = 7;
const tablePrizes = Array.from(new Array(3)).map(() => 
    Array.from(new Array(2)).fill(undefined).map((value) => value) 
); 

if(combi > 0) {
    const selectePrizes = pockerPrizeLegend[combi >= pockerPrizeLegend.length ? pockerPrizeLegend.length - 1: (combi - 1)];
    const duplicate = [];
    const rowDupl = [];  
    for(let tpRow = 0; tpRow < tablePrizes.length; tpRow ++){
        const randomRow = Math.floor(Math.random() * tablePrizes.length);
        const coldupl = [];
        if(!rowDupl.includes(randomRow)) {
            for(let tpCol=0; tpCol < tablePrizes[tpRow].length; tpCol ++){
                const randomCol = Math.floor(Math.random() * tablePrizes[tpRow].length);  
                if(!coldupl.includes(randomCol)) {
                    if(selectePrizes.pcs > duplicate.length) {
                        tablePrizes[randomRow][randomCol] = selectePrizes.pocker
                        console.log(`[${randomRow},${randomCol}]=${selectePrizes.pocker}`);;
                        coldupl.push(randomCol) 
                    }
                    duplicate.push(randomCol);
                }
                else {
                    tpCol--;
                }
            }
            rowDupl.push(randomRow)
        }else {
            tpRow--;
        }
    }
    
    console.log(selectePrizes.pcs, duplicate.length)
}

console.log(tablePrizes)