import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantsService} from "./constants.service";
import {GameStartResponse} from "../models/GameStartResponse";
import {GameResponse} from "../models/GameResponse";
import {Point} from "../models/point";
import {catchError,Subject} from "rxjs";
import {ToaserService} from "../toaster/toaser.service";
import {ErrorService} from "./error.service";
import {WebSocketService} from "./web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,private constants: ConstantsService,private toaster:ToaserService,private error:ErrorService,private ws:WebSocketService) {
    this.grid_size$.subscribe(newSize=>{
      this.grid_size = newSize
      this.delta = Math.floor((newSize/2))
      this.update_grid(this.screen)
    })
    this.grid_size$.next(50)

    this.ws.update$.subscribe((changes)=>{
      changes.forEach((p: { x: number; y: number; })=>{
        this.change_state_infinite(p.x,p.y)
      })
    })
  }

  private create_empty_grid(size:number){
    this.mat = new Array(size)
      .fill(false)
      .map(()=>new Array<boolean>(size).fill(false))
  }

  private screen:Point[] = []
  public mat:boolean[][] = []
  public game_id:string = ""
  public grid_size:number = 0
  public grid_size$ :Subject<number> = new Subject<number>()
  private delta = 0
  public middle_point:number[] = [0,0]

  getScreen(){
    return this.screen
  }

  public change_state_view(x:number, y:number){
    //infinite screen
    let px = this.middle_point[0]+x-this.delta
    let py = this.middle_point[1]+y-this.delta
    if(this.mat[x][y])
      Point.delete_from_array(this.screen,px,py)
    else
      this.screen.push(Point.get_point(px,py))

    //view
    this.mat[x][y] = !this.mat[x][y]
  }


  public change_state_infinite(x:number, y:number){
    //infinite screen
    if(Point.arrayHas(this.screen,x,y))
      Point.delete_from_array(this.screen,x,y)
    else
      this.screen.push(Point.get_point(x,y))

    //view
    let px = x-this.middle_point[0]+this.delta
    let py = y-this.middle_point[1]+this.delta

    if (px<0 || px >= this.grid_size) return
    if (py<0 || py >= this.grid_size) return
    this.mat[px][py] = !this.mat[px][py]
  }

  private update_grid(grid_to_set:Point[]){
    this.create_empty_grid(this.grid_size)
    this.screen = grid_to_set

    this.forEachInFrame(grid_to_set,(x,y)=>{
      this.mat[x][y] = true
    })
  }

  public debug_set_grid(point_array_json:string|null){
    if(!point_array_json)return
    let screen = JSON.parse(point_array_json)
    this.update_grid(screen)
  }


  public start_game(){
    console.log(this.ws.wsId)
  this.http.post<GameStartResponse>(this.constants.startGame,{seed:this.screen,running_state:true,wsId:this.ws.wsId})
    .pipe(catchError(this.error.handelError))
    .subscribe(res=>this.game_id = res.game_id)
  }

  public baseOperation(type:string){
    let url = ""
    switch (type){
      case 'resume':
        url = this.constants.resumeGame
        break
      case 'pause':
        url = this.constants.pauseGame
        break
      case 'reset':
        url = this.constants.resetGame
        break
      case 'one_step':
        url = this.constants.oneStepGame
        break
      case 'stop':
        url = this.constants.stopGame
        this.update_grid([])
        break
      default:
        throw "unknown operation"
    }


    this.http.post<GameResponse>(url,{uuid:this.game_id})
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
        if(res.current_state!=null) {
          let screen = res.current_state
          this.update_grid(screen)
        }
      })
  }

  public get_template(name:string){
    this.http.get<any>(this.constants.templateByName+"/"+name)
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
      if(res.pattern!=null){
        let screen = res.pattern
        this.update_grid(screen)
      }
    })
  }

  public get_user_template(owner:string,name:string){
    this.http.get<any>(this.constants.getUserTemplate+"/"+owner+"/"+name)
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
        if(res.pattern!=null){
          let screen = res.pattern
          this.update_grid(screen)
        }
      })
  }

  public getImage(){
    let size = this.grid_size
    let canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    let ctx = canvas.getContext('2d')
    if(!ctx)return ""

    let imageData = ctx.createImageData(size,size)
    imageData.data.fill(255)
    this.forEachInFrame(this.screen,(x,y)=>{
      let i = x * size *4 + y*4
      imageData.data[i] = 0
      imageData.data[i+1] = 0
      imageData.data[i+2] = 0
      imageData.data[i+3] = 255
    })

    ctx.putImageData(imageData,0,0)
    return canvas.toDataURL()
  }

  private forEachInFrame(pointArray:Point[],fun:(x:number,y:number)=>void){
    let delta = this.delta
    for( let point of pointArray){
      let row = point.x
      let col = point.y

      let newX = row-(this.middle_point[0]-delta)
      let newY = col-(this.middle_point[1]-delta)

      if (newX<0 || newX >= this.grid_size) continue
      if (newY<0 || newY >= this.grid_size) continue

      fun(newX,newY)
    }
  }

  public rotate90deg(){
    let screen = this.screen.map((p)=>Point.get_point(- p.y, p.x))
    this.update_grid(screen)
  }
}
