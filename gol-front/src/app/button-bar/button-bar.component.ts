import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {WebSocketService} from "../services/web-socket.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.css']
})
export class ButtonBarComponent implements OnInit {
  window = window;
  curValue = 1.0
  rateFormControl = new FormControl(this.curValue)
  constructor(public game:GameService,public ws: WebSocketService) { }
  gameNotPaused = true

  sliderInit = [0.1,3,0.1]


  ngOnInit(): void {
    this.ws.game_over$.subscribe((game_over)=>{
      if(game_over)
        this.gameNotPaused = false
    }
    )
    this.rateFormControl.valueChanges.subscribe(v=>{
      if(this.rateFormControl.invalid)
        return
      if(this.curValue === v || !v)
        return;
      this.curValue = v
      this.game.rate$.next(v)
    })

  }
}
