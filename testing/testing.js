const colors = ["blue", "green", "orange", "red", "violet"]
const column = 5;
const rows = 7;
const combi = 8;
let tables = [];

//table prizes
const prizeLegend = [
    {violet: 0, red: 0, blue: 0, green: 0, orange: 0},
    {violet: 3, red: 0, blue: 0, green: 0, orange: 0},
    {violet: 0, red: 3, blue: 0, green: 0, orange: 0},
    {violet: 0, red: 0, blue: 3, green: 0, orange: 0},
    {violet: 0, red: 0, blue: 0, green: 3, orange: 0},
    {violet: 0, red: 0, blue: 0, green: 0, orange: 3},
    {violet: 1, red: 0, blue: 1, green: 0, orange: 1},
    {violet: 1, red: 0, blue: 1, green: 1, orange: 1},
    {violet: 1, red: 1, blue: 1, green: 1, orange: 1},
];
 
//grid
for(let rw = 0; rw < rows; rw ++){
    tables[rw] = []
    const collect = []; 
    for(let cl = 0; cl < column; cl ++){
        const random = Math.floor(Math.random() * colors.length);
        const pickedcolors = colors[random];
        if(!collect.includes(pickedcolors)){
             tables[rw].push({
                [pickedcolors]: false
            });  
            collect.push(pickedcolors);
        }else {
            cl--;
        }
    } 
} 
 
//conditions
const picked = prizeLegend[combi];
const pickeshuffle = Object.keys(picked);

for(let match in pickeshuffle){
    let valuematch = picked[pickeshuffle[match]];
    let repeated = []
    if(valuematch != 0) {
        for(let valm = 0; valm < valuematch; valm ++) {
            const randomIndexes = Math.floor(Math.random() * tables.length);
         if(!repeated.includes(randomIndexes)){
            tables = tables.map((data, index) => {  
             if(index == randomIndexes) {
                return data.map((colors) => {
                    const colorobjects = Object.keys(colors).join('') 
                    if(colorobjects == pickeshuffle[match]) {
                        return { [colorobjects]: true}
                    }
                    return colors
                });
             }
             return data
           })
           repeated.push(randomIndexes);
         }else {
            valm --;
         }
       } 
    }
}
 
console.log(tables)