import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantsService} from "../services/constants.service";
import {Point} from "../models/point";
import {ErrorService} from "../services/error.service";
import {catchError} from "rxjs";
import {GameService} from "../services/game.service";
// @ts-ignore
import {toPng} from 'dom-to-image';
import {UntypedFormControl} from "@angular/forms";
import {ToaserService} from "../toaster/toaser.service";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public searchSelectorForm = new UntypedFormControl(false); //false = username ; true = pattern
  public searchInputForm = new UntypedFormControl('');
  public saveUsernameForm = new UntypedFormControl('');
  public savePatternForm = new UntypedFormControl('');
  public saveImageCheckboxForm = new UntypedFormControl(true);
  public templates_list:Template[] = []
  public user_templates_list:Template[]=[]
  public list_filter = new UntypedFormControl('');

  constructor(private http: HttpClient,private constants: ConstantsService,private error:ErrorService,private game:GameService,private toaster:ToaserService) { }

  ngOnInit(): void {
    this.getTemplates()
    this.searchInputForm.valueChanges.subscribe(this.searchUser.bind(this))
  }

  private getTemplates(){
    this.http.get<Template[]>(this.constants.systemTemplates)
      .pipe(catchError(this.error.handelError))
      .subscribe(v=>this.templates_list = v)
  }

  clickCommonTemplate(template: Template) {
    if(this.PromptOverride())return
    this.game.get_template(template.name)
  }

  clickUserTemplate(template: Template) {
    if(this.PromptOverride())return
    this.game.get_user_template(template.owner,template.name)
  }

  private PromptOverride():boolean{
    return this.game.getScreen().length != 0 && !window.confirm("This will clear the current screen, continue?")

  }
   save()  {
    let username = this.saveUsernameForm.value
    let patternname = this.savePatternForm.value
     this.saveUsernameForm.markAsTouched()
     this.savePatternForm.markAsTouched()
     if(!this.saveUsernameForm.valid || !this.savePatternForm.valid) return;
    let grid = document.getElementById("gol-grid")
    if(!grid)return
     this.http.put(this.constants.saveUserTemplate,{
       username:username,
       name:patternname,
       image:(this.saveImageCheckboxForm.value ? this.game.getImage():undefined),
       pattern:this.game.getScreen()
     },{headers:{}}).pipe(catchError(this.error.handelError)).subscribe(v=>{
       this.toaster.show('Save','Saved successfully')
       this.searchInputForm.updateValueAndValidity()
     })

    }

    private searchUser(value:string){
    if(value===""){
      this.user_templates_list = []
      return
    }
    if(this.searchSelectorForm.value){
      this.http.get<Template[]>(this.constants.userTemplatePreviewByPatternName+value)
        .pipe(catchError(this.error.handelError))
        .subscribe(v=>this.user_templates_list = v)
    }else{
      this.http.get<Template[]>(this.constants.userTemplatePreviewByUsername+value)
        .pipe(catchError(this.error.handelError))
        .subscribe(v=>this.user_templates_list = v)
    }

    }

  changeSearchType() {
    this.searchInputForm.updateValueAndValidity({ onlySelf: false, emitEvent: true })
  }

}

class Template{
  name:string=""
  pattern:Point[]=[]
  owner:string=""
  image:string=""
}
