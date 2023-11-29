// type TCombination = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined
const prizeLegend = [
    {fruits: "strawberry", pcs: 1},
    {fruits: "avocado", pcs: 2},
    {fruits: "cherry", pcs: 3},
    {fruits: "banana", pcs: 4},
    {fruits: "apple", pcs: 5},
    {fruits: "apple", pcs: 6},
    {fruits: "cherry", pcs: 7},
];

const combi = 7;
const tablePrizes = Array.from(new Array(4)).map(() => 
    Array.from(new Array(4))
    .fill(undefined).map((value) => value)) 

if(combi > 0) {
    const collectDuplicates = [];
    const selectePrizes = prizeLegend[combi > prizeLegend.length? prizeLegend.length - 1: (combi - 1)];
    for(let fruits = 0; fruits < selectePrizes.pcs; fruits ++ ){
        const randomRows = Math.floor(Math.random() * tablePrizes.length);
        const randomColumns = Math.floor(Math.random() * tablePrizes[randomRows].length);
        const positions = `rows=${randomRows},cols=${randomColumns}`;
        if(!collectDuplicates.includes(positions)) {
            tablePrizes[randomRows][randomColumns] = selectePrizes.fruits;
            collectDuplicates.push(positions);
        }else {
            fruits --;
        }
    }
}

console.log(tablePrizes)