'use client';

import { shuffleArrays } from "../functions";

type TColorCategories = "blue"|"green"|"orange"|"red"|"violet"
type TSuperballProps = {
    colors: TColorCategories[],
    combination: number;
    columns?: number;
    rows?: number;
}
type TTables = {
    [key: string]: boolean
};

type TTablePrizeProp = {
    [key: string]: number
}
export class SuperBallProperties {
    private tables: TTables[][] = [];
    private prizeLegend:TTablePrizeProp[] = [];
    private colors: TColorCategories[] = []
    private combination: number = 0;
    private column: number = 0;
    private rows: number = 0;
    constructor({colors, combination = 0, columns = 8, rows = 7,}: TSuperballProps){
        this.colors = colors;
        this.combination = combination;
        this.column = columns;
        this.rows = rows
        this.prizeLegend = [
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
        // this.createGrid();
        // this.conditions();
    }

     createGrid () {
        for(let rw = 0; rw <this.rows; rw ++){
            this.tables[rw] = []
            const collect: string[] = []; 
            for(let cl = 0; cl < this.column; cl ++){
                const random = Math.floor(Math.random() * this.colors.length);
                const pickedcolors = this.colors[random];
                if(!collect.includes(pickedcolors)){
                     this.tables[rw].push({
                        [pickedcolors]: false
                    });  
                    collect.push(pickedcolors);
                }else {
                    cl--;
                }
            } 
        } 
        return this.tables;
    }
     conditions () {
        const picked = this.prizeLegend[this.combination];
        const pickeshuffle = Object.keys(picked);
        for(let match in pickeshuffle){
            let valuematch = picked[pickeshuffle[match]];
            let repeated:number[] = []
            if(valuematch != 0) {
                for(let valm = 0; valm < valuematch; valm ++) {
                    const randomIndexes = Math.floor(Math.random() * this.tables.length);
                    if(!repeated.includes(randomIndexes)){
                        this.tables = this.tables.map((data, index) => {  
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
        return this.tables
    }
    getContext() {
        return {
            result: this.tables
        }
    }
}


export function superBallFunction (combination: number)  {
    const colors = ["blue", "green", "orange", "red", "violet"]
    const column = 5;
    const rows = 7;
    const combi = combination;
    let tables: any = [];

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
        const collect:any = []; 
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
    const picked:any = prizeLegend[combi];
    const pickeshuffle = Object.keys(picked);

    for(let match in pickeshuffle){
        let valuematch = picked[pickeshuffle[match]];
        let repeated:any = []
        if(valuematch != 0) {
            for(let valm = 0; valm < valuematch; valm ++) {
                const randomIndexes = Math.floor(Math.random() * tables.length);
            if(!repeated.includes(randomIndexes)){
                tables = tables.map((data: any, index: any) => {  
                if(index == randomIndexes) {
                    return data.map((colors: any) => {
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
    return shuffleArrays(tables);
}