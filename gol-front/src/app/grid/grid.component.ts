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
    this.size = `min(80vw/${newSize},80vh/${newSize})`
    this.cellCss = {
      'min-width': this.size
    }
    this.rowCss ={
      'height': this.size
    }
  }))
  }

  public swap(){
    this.game.mat[0][0] = !this.game.mat[0][0]
  }


  private size = `min(80vw/${this.game.grid_size},80vh/${this.game.grid_size})`

  public  cellCss = {
    'min-width': this.size
  }

  public  rowCss ={
    'height': this.size
  }

}
