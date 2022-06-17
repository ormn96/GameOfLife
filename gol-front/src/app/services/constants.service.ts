import {Injectable, isDevMode} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  constructor() {
    console.log(location.origin)
  }
  private static getServerUrl():string{
    if(isDevMode())
      return "http://localhost:3030/"
    return location.origin+'/'
  }
  public serverUrl = ConstantsService.getServerUrl()
  public wsUrl = this.serverUrl.replace(/^http/, 'ws')

  public gameUrl = this.serverUrl+'game/'

  public startGame = this.gameUrl+"start"
  public oneStepGame = this.gameUrl+"one_step"
  public resetGame = this.gameUrl+"reset"
  public resumeGame = this.gameUrl+"resume"
  public pauseGame = this.gameUrl+"pause"
  public stopGame = this.gameUrl+"stop"

  public changeRate = this.gameUrl+"rate"

  public templates = this.serverUrl+"templates/"
  public templatesPreview = this.templates+'preview'
  public systemTemplates = this.templatesPreview

  public userTemplatePreview = this.templatesPreview+'/user/'
  public userTemplatePreviewByUsername = this.userTemplatePreview+'username/'
  public userTemplatePreviewByPatternName = this.userTemplatePreview+'name/'

  public userTemplates = this.templates + "user/"
  public saveUserTemplate = this.userTemplates+"single"

  public templateByName = this.templates+"single"
  public getUserTemplate = this.templates+"user/single"

}
