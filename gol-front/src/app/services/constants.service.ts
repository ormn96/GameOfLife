import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  constructor() { }

  public serverUrl = "http://localhost:3030/"

  public gameUrl = this.serverUrl+'game/'

  public startGame = this.gameUrl+"start"
  public oneStepGame = this.gameUrl+"one_step"
  public stopGame = this.gameUrl+"stop"

  public templates = this.serverUrl+"templates/"

  public templateByName = this.templates+"single"

}
