export function shuffleArrays(array: boolean[][]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  

type TGridCards = {
  combi: string;
  rows: number;
  columns: number;
}
export class GridBooleansCards {
  private table: boolean[][] = [];
  constructor(private props: TGridCards){
    this.init()
  }
  private init() { 
    for(let col = 0; col < this.props.columns; col ++){
      this.table[col] = [];
      for(let row = 0; row < this.props.rows; row ++) {
        this.table[col].push(false);
      }
    }
    const rcol: string[] = [];
    const combination = this.props.combi.replace(/[^1]/g, '').length
    for(let c = 0; c < combination; c ++) {
      const randomCol = Math.floor(Math.random() * this.props.columns);
      const randomRow = Math.floor(Math.random() * this.props.rows);  
      const rcolrows = `${randomCol}${randomRow}`;
      if(rcol.includes(rcolrows)) {
        c--;
      }else {
        rcol.push(rcolrows)
      }
      this.table[randomCol][randomRow] = true; 
    }
  }
  getValues() {
    return shuffleArrays(this.table)
  }
}

export type TCombination = {
  x: number;
  y:number;
  cornerRadius: number;
  selected: boolean;
  letter: "letterB"|"letterI"|"letterN"|"letterG"|"letterO"
}

type TbingoScratchProp = {
  combi: string;
}
type TPrizeList = (string|string[])[]
export class BingoScratchClass {
  private winnersTable: TCombination[] = [
    {x: 0.35, y: 0.71, cornerRadius: 0, selected: false, letter: "letterB"},
    {x: 0.35, y: 0.6, cornerRadius: 0, selected: false, letter: "letterI"},
    {x: 0.35, y: 0.49, cornerRadius: 0, selected: false, letter: "letterN"},
    {x: 0.55, y: 0.665, cornerRadius: 0.1, selected: false, letter: "letterG"},
    {x: 0.55, y:0.52, cornerRadius:0.1, selected: false, letter: "letterO"}
  ];
  private prizesList: TPrizeList = [
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
  ]
  constructor(private props: TbingoScratchProp) { 
    this.init();
  }
  private init () {
    const combination = this.props.combi.replace(/[^1]/g, '').length;
    if(typeof this.prizesList[combination] == "string") {
      for(let letters=0;letters < this.winnersTable.length; letters ++){
        if(this.prizesList[combination] == this.winnersTable[letters].letter){
          this.winnersTable[letters].selected = true;      
        }
      }
    } else {
      let count = 0
      for(let find=0; find < this.winnersTable.length; find++){
          if(this.prizesList[combination].length > 1 ) { 
            this.winnersTable[find].selected = true;
          } else {
              if(this.prizesList[combination][0] == this.winnersTable[find].letter && (this.winnersTable[find + 1] && count != 1)){ 
                this.winnersTable[find].selected = true;
                  const nextIndex = find + 1;
                  this.winnersTable[nextIndex].selected = true;
                  this.winnersTable[nextIndex].cornerRadius = this.winnersTable[find].cornerRadius;
                  this.winnersTable[nextIndex].letter = this.winnersTable[find].letter;
                  count ++;
              } 
          }   
      }
    }
  }
  getValue() { 
    return this.winnersTable
  }
}