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
  }

  public swap(){
    this.game.mat[0][0] = !this.game.mat[0][0]
  }
}
