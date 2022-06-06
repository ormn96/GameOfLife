export class SparseMatrixBool {

    constructor() {
        this.m = new Map()
    }

   set(x,y,v){
        if (!v){
            if(!this.m.get(x)) return;
            if(!this.m.get(x).has(y)) return;
            this.m.get(x).delete(y)
            if(this.m.get(x).size===0){
                this.m.delete(x)
            }
            return
        }
        if(! this.m.get(x)){
            this.m.set(x,new Set())
        }
       this.m.get(x).add(y)
   }

   get(x,y){
       if(!this.m.get(x)) return false;
       return this.m.get(x).has(y)
   }

   forEach(callback){
        let _this = this
        this.m.forEach((set,x)=>{
            set.forEach((y)=>{
                callback(x,y,_this)
            })
        })
   }

   dup(){
       let cop = new SparseMatrixBool()
       this.m.forEach((original_set,x)=>{
           cop.m.set(x,new Set(original_set))
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

   to_point_array(){
        const ret = []
       this.forEach((x,y)=>{
           ret.push({x:x,y:y})
       })
       return ret
   }

   static from_point_array(point_array){
       const m = new SparseMatrixBool()
       point_array.forEach(v=>{
           m.set(v.x,v.y,true)
       })
       return m
   }
}
