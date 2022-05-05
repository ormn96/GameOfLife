import { Component, OnInit } from '@angular/core';
import {ToaserService} from "../toaser.service";

@Component({
  selector: 'app-toaseter-container',
  templateUrl: './toaseter-container.component.html',
  styleUrls: ['./toaseter-container.component.css']
})
export class ToaseterContainerComponent implements OnInit {

  constructor(public toaster_service:ToaserService) { }

  ngOnInit(): void {
  }

}
