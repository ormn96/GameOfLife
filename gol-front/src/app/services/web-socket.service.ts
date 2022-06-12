import { Injectable } from '@angular/core';
import {ConstantsService} from "./constants.service";
import {Subject} from "rxjs";
import {ErrorService} from "./error.service";
import {ToaserService} from "../toaster/toaser.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public update$ = new Subject<any>()
  public wsId = ''

  constructor(private constants:ConstantsService,private toaster:ToaserService) {
    this.connect();
  }

  private connect() {
    let s = new WebSocket(this.constants.wsUrl)
    s.onclose = () => {
      this.toaster.showError("Web Socket", "Web socket closed, trying to reconnect."
      )
      setTimeout(() =>{
        this.connect();
      }, 1000);
    }
    s.onerror = (ev) => this.toaster.showError("Web Socket", `Web socket closed :${JSON.stringify(ev)}`)

    s.onmessage = (me) => {
      let message = JSON.parse(me.data)
      switch (message.key) {
        case 'init':
          this.wsId = message.value
          break
        case 'update':
          console.log(message.value)
          this.update$.next(message.value)
          break
        default:
          console.error(`unknown ws message :`, message)
      }
    }
  }
}
