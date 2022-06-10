import { Component, OnInit } from '@angular/core';
import {FormControl, UntypedFormControl} from "@angular/forms";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.component.html',
  styleUrls: ['./size-selector.component.css']
})
export class SizeSelectorComponent implements OnInit {
  public selector
  sizes = [5,10,20,30,50,100]
  constructor(private game:GameService) {
    this.selector = new UntypedFormControl(this.game.grid_size)
  }

  ngOnInit(): void {
    this.selector.valueChanges.subscribe((v)=>{
      this.game.grid_size$.next(v)})
  }

}
