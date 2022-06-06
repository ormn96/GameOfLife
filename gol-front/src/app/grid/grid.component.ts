import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  window = window;

  constructor(public game:GameService) { }

  ngOnInit(): void {
  this.game.grid_size$.subscribe((newSize=>{
    this.setSize(newSize)
  }))
    this.setSize(this.game.grid_size)
  }

  private setSize(newSize:number){
    let size = `min(60vw/${newSize},75vh/${newSize})`
    this.cellCss = {
      'min-width': size
    }
    this.rowCss ={
      'height': size
    }
  }

  public swap(){
    this.game.mat[0][0] = !this.game.mat[0][0]
  }


  public  cellCss:any

  public  rowCss :any

}
