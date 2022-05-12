import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantsService} from "../services/constants.service";
import {Point} from "../models/point";
import {ErrorService} from "../services/error.service";
import {catchError} from "rxjs";
import {GameService} from "../services/game.service";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public templates_list:Template[] = []
  constructor(private http: HttpClient,private constants: ConstantsService,private error:ErrorService,private game:GameService) { }

  ngOnInit(): void {
    this.getTemplates()
  }

  private getTemplates(){
    this.http.get<Template[]>(this.constants.systemTemplates)
      .pipe(catchError(this.error.handelError))
      .subscribe(v=>this.templates_list = v)
  }

  clickCommonTemplate(template: Template) {
    this.game.get_template(template.name)
  }

   save()  {
    // @ts-ignore
    let username = document.getElementById("username").value
    // @ts-ignore
    let patternname = document.getElementById("patternname").value
    let grid = document.getElementById("gol-grid")
    if(!grid)return
    html2canvas(grid).then(c=>{
      console.log("image created")
      let im = c.toDataURL()
      this.http.put(this.constants.saveUserTemplate,{
        username:username,
        name:patternname,
        image:im,
        pattern:this.game.getScreen()
      },{headers:{}}).pipe(catchError(this.error.handelError)).subscribe(v=>{
        console.log("Sfsdf")
        console.log(v)})
    })
    }

}

class Template{
  name:string=""
  pattern:Point[]=[]
  owner:string=""
  image:string=""
}
