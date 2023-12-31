
export function shuffleArrays(array: any[][]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--; 
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

export class PockerPrizeClass {
  private pockerPrizeLegend = [
      {pocker: "clubs", pcs: 1},
      {pocker: "clubs", pcs: 2},
      {pocker: "heart", pcs: 3},
      {pocker: "heart", pcs: 4},
      {pocker: "spades", pcs: 3},
      {pocker: "spades", pcs: 5},
      {pocker: "diamond", pcs: 5},
  ];
  private tablePrizes: any = [];

  constructor(private props: TbingoScratchProp) {
    this.tablePrizes = Array.from(new Array(3)).map(() => 
        Array.from(new Array(2)).fill(undefined).map((value) => value) 
    ); 
    this.init();
  }
  
  private init() {
    const combi = this.props.combi.replace(/[^1]/g, "").length;
    if( combi > 0){
      const selectePrizes = this.pockerPrizeLegend[combi >= this.pockerPrizeLegend.length ? this.pockerPrizeLegend.length - 1: (combi - 1)];
      const duplicate = [];
      const rowDupl:number[] = [];  
      for(let tpRow = 0; tpRow < this.tablePrizes.length; tpRow ++){
        const randomRow = Math.floor(Math.random() * this.tablePrizes.length);
        const coldupl:number[] = [];
        if(!rowDupl.includes(randomRow)) {
            for(let tpCol=0; tpCol < this.tablePrizes[tpRow].length; tpCol ++){
                const randomCol = Math.floor(Math.random() * this.tablePrizes[tpRow].length);  
                if(!coldupl.includes(randomCol)) {
                    if(selectePrizes.pcs > duplicate.length) {
                        this.tablePrizes[randomRow][randomCol] = selectePrizes.pocker 
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
    }
  }
  public getValue() { 
    return this.tablePrizes;
  } 
}

type TCombinationFruits = "strawberry" | "avocado" | "cherry" | "banana" | "apple" | undefined;
type TPrizeLegend = {
  fruits: TCombinationFruits,
  pcs: number
}
export class FruitBlashClass {
  private tablePrizes: TCombinationFruits[][] = [];
  private prizeLegend: TPrizeLegend[] = [
    {fruits: "strawberry", pcs: 1},
    {fruits: "avocado", pcs: 2},
    {fruits: "cherry", pcs: 3},
    {fruits: "banana", pcs: 4},
    {fruits: "apple", pcs: 5},
    {fruits: "apple", pcs: 6},
    {fruits: "cherry", pcs: 7},
];
  constructor(private props: TbingoScratchProp){
    this.tablePrizes = Array.from(new Array(4)).map(() => Array.from(new Array(4)).fill(undefined).map((value) => value));
    this.init();
  }
  private init () {
    const combi = this.props.combi.replace(/[^1]/g, "").length;
    if(combi > 0) {
      const collectDuplicates:string[] = [];
      const selectePrizes = this.prizeLegend[combi > this.prizeLegend.length? this.prizeLegend.length - 1: (combi - 1)];
      for(let fruits = 0; fruits < selectePrizes.pcs; fruits ++ ){
          const randomRows = Math.floor(Math.random() * this.tablePrizes.length);
          const randomColumns = Math.floor(Math.random() * this.tablePrizes[randomRows].length);
          const positions = `rows=${randomRows},cols=${randomColumns}`;
          if(!collectDuplicates.includes(positions)) {
              this.tablePrizes[randomRows][randomColumns] = selectePrizes.fruits;
              collectDuplicates.push(positions);
          }else {
              fruits --;
          }
      }
    }
  }
  getValue() {
    return this.tablePrizes
  }
}

type TPrizeBingoLegend = {[key: string]: number};
type TBingoProps = {
  rows?: number;
  cols?: number;
  prizeLegend?: TPrizeBingoLegend[];
}
export class BingoBonanzaClass {
  private bingoTables: any = [];
  private prizeLegend: TPrizeBingoLegend[] = [];
  constructor(private props: TbingoScratchProp & TBingoProps){
    if(this.props.prizeLegend) {
      this.prizeLegend =  this.props.prizeLegend
    } else {
      this.prizeLegend = [
        {b: 1, i:0, n: 0, g: 0, o: 0},
        {b: 3, i:0, n: 0, g: 0, o: 0},
        {b: 0, i:3, n: 0, g: 0, o: 0},
        {b: 0, i:0, n: 3, g: 0, o: 0},
        {b: 0, i:0, n: 0, g: 3, o: 0},
        {b: 0, i:0, n: 0, g: 0, o: 3},
        {b: 3, i:0, n: 0, g: 0, o: 0},
        {b: 1, i:1, n: 0, g: 0, o: 0},
        {b: 1, i:1, n: 1, g: 0, o: 0},
        {b: 1, i:1, n: 1, g: 1, o: 0},
        {b: 1, i:1, n: 1, g: 1, o: 1},
      ];
    }
    this.bingoTables = [...new Array(this.props.rows)].map(() => [...new Array(this.props.cols)]);
    this.init();
  }

  private init() {
    const combi = this.props.combi.replace(/[^1]/g, "").length;  
    if(combi > 0) {
      const collectPos: string[] = [];
      const selectePrizes = this.prizeLegend[combi > this.prizeLegend.length? this.prizeLegend.length - 1: combi - 1];
      const checklettersavail = Object.entries(selectePrizes);
      for(let lists=0; lists < checklettersavail.length; lists++){
          for(let repeats = 0; repeats < checklettersavail[lists][1]; repeats ++ ) {
              const randomRows = Math.floor(Math.random() * this.bingoTables.length);
              const randomCols = Math.floor(Math.random() * this.bingoTables[randomRows].length);
              const positions = `rows=${randomRows},cols=${randomCols}`; 
              if(!collectPos.includes(positions)){
                  this.bingoTables[randomRows][randomCols] = checklettersavail[lists][0];
                  collectPos.push(positions);
              }else {
                  repeats--;
              } 
          }
      } 
    }
  } 
  getValues () {   
    return this.bingoTables;
  }
}

type TPrizeDiceLegend = {[key: string]: number};
export class DiceRollerClass {
  private tables: any = [];
  private prizeLegend: TPrizeDiceLegend[] = [];
  constructor(private props: TbingoScratchProp){
    this.prizeLegend = [
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
    this.tables = [...new Array(3)].map(() => [...new Array(3)]);
    this.init();
  }

  private init() {
    const combi = this.props.combi.replace(/[^1]/g, "").length;
    if(combi > 0) {
      const collectPos: string[] = [];
      const selectePrizes = this.prizeLegend[combi > this.prizeLegend.length? this.prizeLegend.length - 1: combi - 1];
      const checklettersavail = Object.entries(selectePrizes);
      for(let lists=0; lists < checklettersavail.length; lists++){
          for(let repeats = 0; repeats < checklettersavail[lists][1]; repeats ++ ) {
              const randomRows = Math.floor(Math.random() * this.tables.length);
              const randomCols = Math.floor(Math.random() * this.tables[randomRows].length);
              const positions = `rows=${randomRows},cols=${randomCols}`; 
              if(!collectPos.includes(positions)){
                  this.tables[randomRows][randomCols] = parseInt(checklettersavail[lists][0]);
                  collectPos.push(positions);
              }else {
                  repeats--;
              } 
          }
      } 
    }
  }

  getValues () {
    return this.tables;
  }
}

interface TMatchPrizeProps<T> {
  combi: string;
  keyPrizes: T[]
}
type TMatchTableProp = {
  column: number;
  rows: number;
}
export class MatchPrizeClass<K> {
  constructor(private props: TMatchPrizeProps<K>, private table: TMatchTableProp = {column: 3, rows: 3}){}
  get(){
    const combi = (this.props.combi.match(/1/gi) || []).length;
    const key_name = this.props.keyPrizes;
    const key_lists = Object.fromEntries(key_name.map(k => [k, 0]));
    const table_match = Array.from({ length: 8 }, () => ({ ...key_lists }));
    const result_table = Array.from({ length: this.table.rows }, () => Array(this.table.column).fill(null));

    if (combi > 0) {
      for (let i = 0; i < table_match.length; i++) {
          for (let j = 0; j < key_name.length; j++) {
              table_match[i][key_name[j]] = i === j ? 3 : 0;
          }
      }
      let select_table = Object.entries(table_match[combi > table_match.length ? table_match.length - 1 : combi - 1]);
      let newsets:any = [];
      for (let i = 0; i < select_table.length; i++) {
          if (select_table[i][1] !== 0) {
              newsets = Array(select_table[i][1]).fill(select_table[i][0]);
          }
      }
  
      let prev_dup:any = [];
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
      
    return result_table
  }
}

interface IEasyTwoDigitProp<P> {
  combi: string;
  colorLists: string[];
  prizeLists: P[]
}

export class EasyTwoDigitMethod<T> {
  constructor(private props: IEasyTwoDigitProp<T>){}
  get(){ 
    let combi_number = (this.props.combi.match(/1/g) || []).length;
    let color_list = this.props.colorLists;
    let prize_list = this.props.prizeLists;
    let winning_table:any = {"winning_number": [], "rand_number": []};
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
    return winning_table
  }
}
