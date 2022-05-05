import { Injectable } from '@angular/core';

class Toast {
  static timeout = 2000

  constructor(public title:string,public body:string,list:Toast[]) {
    setTimeout(()=>{
      list.shift()
    },Toast.timeout)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToaserService {

  constructor() { }

  private _toasts:Toast[]=[]

  public get toasts(){
    return this._toasts
  }

  show(title: string, body: string) {
  this._toasts.push(new Toast(title,body,this._toasts))
  }
}
