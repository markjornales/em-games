let combi = "0";
let combi_number = (combi.match(/1/g) || []).length;
let color_list = ["red", "blue", "green", "pink", "yellow"];
let prize_list = ["5", "10", "20", "50", "100", "500", "5k", "50k"];
let winning_table = {
  "winning_number": [],
  "rand_number": []
};

let zero_win = combi_number === 0 ? Math.floor(Math.random() * (prize_list.length - 1)) + 1 : combi_number;
let rand_colors = Math.floor(Math.random() * color_list.length);
let combi_prize = prize_list[combi_number > prize_list.length ? prize_list.length - 1 : zero_win - 1];
let selected_color = color_list[rand_colors];

winning_table["winning_number"] = Array.from({ length: 2 }, () => [combi_prize, selected_color]);

let duplicate_number = [];
let duplicate_color = [];
let count = 0;
while (count < 4) {
  zero_win = Math.floor(Math.random() * (prize_list.length - 1)) + 1;
  rand_colors = Math.floor(Math.random() * color_list.length);
  combi_prize = prize_list[combi_number > prize_list.length ? prize_list.length - 1 : zero_win - 1];
  selected_color = color_list[rand_colors];
  let rand_number = Array.from({ length: 2 }, () => [combi_prize, selected_color]);
  if (!winning_table["winning_number"][0].includes(combi_prize)) {
    if (duplicate_number.filter(e => e == combi_prize).length < 1 && duplicate_color.filter(e => e == selected_color).length < 1) {
        duplicate_number.push(combi_prize);
        duplicate_color.push(selected_color);
        winning_table["rand_number"].push(rand_number);
    } else {
      count--;
    }
  } else {
    count--;
  }
  count++;
}

if (combi_number > 0) {
  let rand_index_number = Math.floor(Math.random() * (winning_table["rand_number"].length - 1)) + 1;
  let winning_table_copy = [...winning_table["winning_number"]];
  winning_table["rand_number"][rand_index_number - 1] = winning_table_copy;
}

console.log(winning_table);
console.log(winning_table["rand_number"]) 