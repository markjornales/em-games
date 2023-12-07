// let row = 3;
// let col = 3;
// let text = "11";
// let combi = (text.match(/1/gi) || []).length;
// let key_name = ["5", "10", "50", "100", "500", "1k", "10k", "100k"];
// let key_lists = {};
// for (let i = 0; i < key_name.length; i++) {
//     key_lists[key_name[i]] = 0;
// }
// let table_match = [];
// for (let i = 0; i < 8; i++) {
//     table_match.push(Object.assign({}, key_lists));
// }
// let result_table = [];
// for (let i = 0; i < row; i++) {
//     let row = [];
//     for (let j = 0; j < col; j++) {
//         row.push(null);
//     }
//     result_table.push(row);
// }
// if (combi > 0) {
//     for (let i = 0; i < table_match.length; i++) {
//         for (let j = 0; j < key_name.length; j++) {
//             table_match[i][key_name[j]] = (i === j) ? 3 : 0;
//         }
//     }
//     let select_table = Object.entries(table_match[(combi > table_match.length) ? table_match.length - 1 : combi - 1]);
//     let newsets = [];
//     for (let i = 0; i < select_table.length; i++) {
//         if (select_table[i][1] !== 0) {
//             newsets = Array(select_table[i][1]).fill(select_table[i][0]); 
//         }
//     }
    
//     let prev_dup = [];
//     let count = 0;
//     while (count < newsets.length) {
//         let trows = Math.floor(Math.random() * result_table.length);
//         let tcols = Math.floor(Math.random() * result_table[trows].length);
//         let position = `rows=${trows},cols=${tcols}`;
//         if (!prev_dup.includes(position)) {
//             result_table[trows][tcols] = newsets[count];
//             prev_dup.push(position);
//         } else {
//             count -= 1;
//         }
//         count += 1;
//     }
// }

// console.log(result_table)

let row = 3;
let col = 4;
let text = "1";
let combi = (text.match(/1/gi) || []).length;
let key_name = ["5", "10", "50", "100", "500", "1k", "10k", "100k"];
let key_lists = Object.fromEntries(key_name.map(k => [k, 0]));
let table_match = Array.from({ length: 8 }, () => ({ ...key_lists }));
let result_table = Array.from({ length: row }, () => Array.from({ length: col }, () => null));

if (combi > 0) {
    for (let i = 0; i < table_match.length; i++) {
        for (let j = 0; j < key_name.length; j++) {
            table_match[i][key_name[j]] = i === j ? 3 : 0;
        }
    }

    let select_table = Object.entries(table_match[combi > table_match.length ? table_match.length - 1 : combi - 1]);
    let newsets = [];
    for (let i = 0; i < select_table.length; i++) {
        if (select_table[i][1] !== 0) {
            newsets = Array(select_table[i][1]).fill(select_table[i][0]);
        }
    }

    let prev_dup = [];
    let count = 0;
    while (count < newsets.length) {
        let trows = Math.floor(Math.random() * result_table.length);
        let tcols = Math.floor(Math.random() * result_table[trows].length);
        let position = `rows=${trows},cols=${tcols}`;

        if (!prev_dup.includes(position)) {
            result_table[trows][tcols] = newsets[count];
            prev_dup.push(position);
        } else {
            count--;
        }
        count++;
    }
} 
 
let storeCombi = result_table.flat(); 
for (let i = 0; i < result_table.length; i++) {
  let row = result_table[i]; 
  for (let rt = 0; rt < row.length; rt++) { 
    let ranKeyName = key_name[Math.floor(Math.random() * key_name.length)]; 
    if (row[rt] === null) { 
      if (storeCombi.filter(name => name === ranKeyName).length < 2) { 
        result_table[i][rt] = ranKeyName; 
        storeCombi.push(ranKeyName);
      } else {
        rt--;
      }
    }
  }
}

console.log(result_table);
