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
