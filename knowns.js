import {SparseMatrixBool} from "./sparseMatrix.js";


export const penta_decathlon = ()=>{
    const m = new SparseMatrixBool()
    m.set(0,0,true)
    m.set(0,1,true)
    m.set(0,-1,true)
    m.set(1,0,true)
    m.set(1,1,true)
    m.set(1,-1,true)
    m.set(2,1,true)
    m.set(2,-1,true)
    m.set(3,0,true)
    m.set(3,1,true)
    m.set(3,-1,true)
    m.set(-1,0,true)
    m.set(-1,1,true)
    m.set(-1,-1,true)
    m.set(-2,1,true)
    m.set(-2,-1,true)
    m.set(-3,0,true)
    m.set(-3,1,true)
    m.set(-3,-1,true)

    return m
}

export const blinker = ()=>{
    const m = new SparseMatrixBool()
    m.set(0,0,true)
    m.set(0,1,true)
    m.set(0,-1,true)
    return m
}