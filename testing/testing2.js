// const prizeLegend = [
//     {b: 1, i:0, n: 0, g: 0, o: 0},
//     {b: 3, i:0, n: 0, g: 0, o: 0},
//     {b: 0, i:3, n: 0, g: 0, o: 0},
//     {b: 0, i:0, n: 3, g: 0, o: 0},
//     {b: 0, i:0, n: 0, g: 3, o: 0},
//     {b: 0, i:0, n: 0, g: 0, o: 3},
//     {b: 3, i:0, n: 0, g: 0, o: 0},
//     {b: 1, i:1, n: 0, g: 0, o: 0},
//     {b: 1, i:1, n: 1, g: 0, o: 0},
//     {b: 1, i:1, n: 1, g: 1, o: 0},
//     {b: 1, i:1, n: 1, g: 1, o: 1},
// ];
const prizeLegend = [
    {1: 3, 2:0, 3: 0, 4: 0, 5: 0, 6: 0, 7:0, 8: 0, 9: 0},
    {1: 0, 2:3, 3: 0, 4: 0, 5: 0, 6: 0, 7:0, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 3, 4: 0, 5: 0, 6: 0, 7:0, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 3, 5: 0, 6: 0, 7:0, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 0, 5: 3, 6: 0, 7:0, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 0, 5: 0, 6: 3, 7:0, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 0, 5: 0, 6: 0, 7:3, 8: 0, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 0, 5: 0, 6: 0, 7:0, 8: 3, 9: 0},
    {1: 0, 2:0, 3: 0, 4: 0, 5: 0, 6: 0, 7:0, 8: 0, 9: 3},
];
// row 3 col 2
const combi = 11;
const bingoTables = [...new Array(3)].map(() => [...new Array(3)]);
const collectPos = [];
const selectePrizes = prizeLegend[combi > prizeLegend.length? prizeLegend.length - 1: combi - 1];
const checklettersavail = Object.entries(selectePrizes);
for(let lists=0; lists < checklettersavail.length; lists++){
    for(let repeats = 0; repeats < checklettersavail[lists][1]; repeats ++ ) {
        const randomRows = Math.floor(Math.random() * bingoTables.length);
        const randomCols = Math.floor(Math.random() * bingoTables[randomRows].length);
        const positions = `rows=${randomRows},cols=${randomCols}`; 
        if(!collectPos.includes(positions)){
            bingoTables[randomRows][randomCols] = parseInt(checklettersavail[lists][0]);
            collectPos.push(positions);
        }else {
            repeats--;
        } 
    }
} 

console.log(bingoTables)