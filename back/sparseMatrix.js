import * as math from 'mathjs'
export class SparseMatrixBool {

    constructor() {
        this.m = new Map()
    }

   set(x,y,v){
        if (!v){
            if(!this.m.get(x)) return;
            if(!this.m.get(x).get(y)) return;
            this.m.get(x).delete(y)
            if(this.m.get(x).size===0){
                this.m.delete(x)
            }
            return
        }
        if(! this.m.get(x)){
            this.m.set(x,new Map())
        }
       this.m.get(x).set(y,v)
   }

   get(x,y){
       if(!this.m.get(x)) return false;
       if(!this.m.get(x).get(y)) return false;
       return this.m.get(x).get(y)
   }

   forEach(callback){
        let _this = this
        this.m.forEach((map,x)=>{
            map.forEach((val,y)=>{
                callback(x,y,_this)
            })
        })
   }

   dup(){
       let cop = new SparseMatrixBool()
       this.m.forEach((map,x)=>{
           let tmp = new Map()
           cop.m.set(x,tmp)
           this.m.get(x).forEach((v,y)=>{
               tmp.set(y,v)
           })
       })
       return cop
   }

   crop_to_matrix(x,y,size){
        let mat = []
       for (let i = x-size;i<=x+size;i++){
           let row = []
           for (let j = y-size;j<=y+size;j++){
               row.push(this.get(i,j))
           }
           mat.push(row)
       }
       return mat
   }
}
