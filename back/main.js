
// https://code-with-me.global.jetbrains.com/y4-ALA4V99i8Qk8q_zbwrw#p=WS&fp=DDA578A53D79B9C864A2BC15CB0A5473E96CD3275BB64F30402B11B1C4275476
import {SparseMatrixBool} from "./sparseMatrix.js";
import {GameOfLife} from "./GameOfLife.js";

console.log("aaaa")

const a = new SparseMatrixBool()
// console.log(a.get(1,1))
// a.set(1,1,true)
// console.log(a.get(1,1))
// a.set(1,1,false)
// console.log(a.get(1,1))

a.set(1,1,true)
a.set(1,2,true)
a.set(1,3,true)
a.set(5,1,true)

const printer = (cur,changes)=>{
    console.log(cur.crop_to_matrix(1,2,2))
}
const gol = new GameOfLife(a,printer)
console.log(gol.current)
gol.next_generation()
console.log(gol.current)
gol.next_generation()
console.log(gol.current)
gol.next_generation()
console.log(gol.current)

console.log(a.crop_to_matrix(2,0,2))

