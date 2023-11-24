const combinations = [
    {x: 0.35, y: 1.26, cornerRadius: 0, selected: false, letter: "letterB"},
    {x: 0.35, y: 1.07, cornerRadius: 0, selected: false, letter: "letterI"},
    {x: 0.35, y: 0.88, cornerRadius: 0, selected: false, letter: "letterN"},
    {x: 0.55, y: 1.185, cornerRadius: 0.1, selected: false, letter: "letterG"},
    {x: 0.55, y:0.94, cornerRadius:0.1, selected: false, letter: "letterO"}
  ];
  const combi = 0;
//   const tableWinners = []; 
  const prizes = [
    "none",
    "letterB",
    "letterI",
    "letterN",
    "letterG",
    "letterO",
    ["letterB"],
    ["letterI"],
    ["letterN"],
    ["letterB", "letterI", "letterN", "letterG", "letterO"]
  ];

if(typeof prizes[combi] == "string") {
    for(let letters=0;letters < combinations.length; letters ++){
        if(prizes[combi] == combinations[letters].letter){
            combinations[letters].selected = true;      
        }
    }
}else { 
    let count = 0
    for(let find=0; find < combinations.length; find++){
        if(prizes[combi].length > 1 ) { 
            combinations[find].selected = true;
        }else {
            if(prizes[combi][0] == combinations[find].letter && (combinations[find + 1] && count != 1)){ 
                combinations[find].selected = true;
                const nextIndex = find + 1;
                combinations[nextIndex].selected = true;
                combinations[nextIndex].cornerRadius = combinations[find].cornerRadius;
                combinations[nextIndex].letter = combinations[find].letter;
                count ++;
            } 
        }
        
    }
}

  console.log(combinations)
 