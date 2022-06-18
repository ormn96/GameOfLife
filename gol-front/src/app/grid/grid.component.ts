import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {WebSocketService} from "../services/web-socket.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  window = window;

  constructor(public game:GameService,public ws:WebSocketService) { }

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
  ctrl= '';

  changeSize($event: WheelEvent) {
    let newSize = this.game.grid_size + Math.sign( $event.deltaY)*10
    if(newSize<=0)return
    this.game.grid_size$.next(newSize)
  }

  click(indexOfRow: number, indexOfCol: number, $event: MouseEvent) {
    if($event.ctrlKey){
      this.game.update_middle(indexOfRow,indexOfCol)
    }else{
      this.game.change_state_view(indexOfRow,indexOfCol)
    }
  }
}
