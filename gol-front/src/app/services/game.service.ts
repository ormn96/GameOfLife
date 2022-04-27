import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() {
    this.mat = []
    for (let i = 0; i < 10; i++) {
      let row = []
      for (let j = 0; j < 10; j++) {
        row[j]=false
      }
      this.mat[i]=row
    }
  }

  public mat:boolean[][]

}
