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