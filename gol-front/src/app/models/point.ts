export class Point{
  constructor() {
  }


  public x:number =0
  public y:number =0

  static get_point(x:number,y:number):Point{
    let p = new Point()
    p.x=x
    p.y=y
    return p
  }

  static delete_from_array(arr:Point[],x:number,y:number){
    // let index = arr.indexOf(Point.get_point(x,y))
    let index = this.findIndex(arr,x,y)
    if(index!=-1)
      return arr.splice(index,1)
    return arr
  }

  static findIndex(arr:Point[],x:number,y:number){
    return arr.findIndex(p=>p.x===x&&p.y==y)
  }

  static arrayHas(arr:Point[],x:number,y:number){
    return arr.findIndex(p=>p.x===x&&p.y==y)!=-1
  }
}
