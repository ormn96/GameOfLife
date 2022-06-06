
// https://code-with-me.global.jetbrains.com/y4-ALA4V99i8Qk8q_zbwrw#p=WS&fp=DDA578A53D79B9C864A2BC15CB0A5473E96CD3275BB64F30402B11B1C4275476
import {SparseMatrixBool} from "./sparseMatrix.js";
import {GameOfLife} from "./GameOfLife.js";
import {save_template,get_template_by_name} from "./database.js";
import {penta_decathlon} from "./knowns.js";

const a = new SparseMatrixBool()
// console.log(a.get(1,1))
// a.set(1,1,true)
// console.log(a.get(1,1))
// a.set(1,1,false)
// console.log(a.get(1,1))

// a.set(1,1,true)
// a.set(1,2,true)
// a.set(1,3,true)
// a.set(5,1,true)
//
// const printer = (cur,changes)=>{
//     console.log(cur.crop_to_matrix(1,2,2))
// }
// const gol = new GameOfLife(a,printer)

const run1=()=>{

    const Penta_decathlon = penta_decathlon()
    save_template('Penta-decathlon',Penta_decathlon)
    // console.log(Penta_decathlon.crop_to_matrix(0,0,2))
    //
    // const printer = (cur,changes)=>{
    //     console.log(cur.crop_to_matrix(0,0,2))
    // }
    // const gol = new GameOfLife(Penta_decathlon,printer)
}

// run1()
get_template_by_name('Penta-decathlon').then(v=>console.log(SparseMatrixBool.from_point_array(v.pattern).dup()))
// console.log(gol.current)
// gol.next_generation()
// console.log(gol.current)
// gol.next_generation()
// console.log(gol.current)
// gol.next_generation()
// console.log(gol.current)
//
// console.log(a.crop_to_matrix(2,0,2))

