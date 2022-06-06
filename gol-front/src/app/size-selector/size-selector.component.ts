import { Component, OnInit } from '@angular/core';
import {FormControl, UntypedFormControl} from "@angular/forms";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-size-selector',
  templateUrl: './size-selector.component.html',
  styleUrls: ['./size-selector.component.css']
})
export class SizeSelectorComponent implements OnInit {
  public selector = new UntypedFormControl(51)
  sizes = [5,11,21,31,51,101]
  constructor(private game:GameService) { }

  ngOnInit(): void {
    this.selector.valueChanges.subscribe((v)=>{
      this.game.grid_size$.next(v)})
  }

}
