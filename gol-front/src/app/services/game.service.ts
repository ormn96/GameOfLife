import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConstantsService} from "./constants.service";
import {GameStartResponse} from "../models/GameStartResponse";
import {GameResponse} from "../models/GameResponse";
import {Point} from "../models/point";
import {catchError, EMPTY} from "rxjs";
import {ToaserService} from "../toaster/toaser.service";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,private constants: ConstantsService,private toaster:ToaserService,private error:ErrorService) {
    this.create_empty_grid(this.grid_size)
  }

  private create_empty_grid(size:number){
    this.mat = new Array(size)
      .fill(false)
      .map(()=>new Array<boolean>(size).fill(false))
    // for (let i = 0; i < size; i++) {
    //   let row = []
    //   for (let j = 0; j < size; j++) {
    //     row[j]=false
    //   }
    //   this.mat[i]=row
    // }
  }

  private screen:Point[] = []
  public mat:boolean[][] = []
  public game_id:string = ""
  public grid_size:number = 51
  private delta = Math.floor((this.grid_size/2))
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
    this.mat[px][py] = !this.mat[px][py]
  }

  private update_grid(grid_to_set:Point[]){
    this.create_empty_grid(this.grid_size)
    let delta = this.delta

    for( let point of grid_to_set){
      let row = point.x
      if(row<this.middle_point[0]-delta) continue
      if(row>this.middle_point[0]+delta) continue

      let col = point.y
      if(col<this.middle_point[1]-delta) continue
      if(col>this.middle_point[1]+delta) continue

      this.mat[row-(this.middle_point[0]-delta)][col-(this.middle_point[1]-delta)] = true
    }
  }

  public debug_set_grid(point_array_json:string|null){
    if(!point_array_json)return
    this.screen = JSON.parse(point_array_json)
    this.update_grid(this.screen)
  }

  private grid_to_point_array(grid:boolean[][]):Point[]{
    let delta = Math.floor((this.grid_size/2))
    let ret:Point[] = []
    for(let i =0 ;i<grid.length;i++){
      for(let j=0;j<grid[i].length;j++){
        if(grid[i][j]){
          let p = new Point()
          p.x = this.middle_point[0]+i-delta
          p.y = this.middle_point[1]+j-delta
          ret.push(p)
        }
      }
    }
    return ret
  }

  public start_game(){
  this.http.post<GameStartResponse>(this.constants.startGame,{seed:this.screen,running_state:false})
    .pipe(catchError(this.error.handelError))
    .subscribe(res=>this.game_id = res.game_id)
  }

  public one_step(){
    this.http.post<GameResponse>(this.constants.oneStepGame,{uuid:this.game_id})
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
        if(res.current_state!=null) {
          this.screen = res.current_state
          this.update_grid(this.screen)
        }
    })
  }

  public stop_game(){
    this.http.post<GameResponse>(this.constants.stopGame,{uuid:this.game_id})
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
      if(res.current_state!=null) {
        this.screen = res.current_state
        this.update_grid(this.screen)
      }
    })
  }

  public get_template(name:string){
    this.http.get<any>(this.constants.templateByName+"/"+name)
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
      if(res.pattern!=null)
        this.screen = res.pattern
        this.update_grid(res.pattern)
    })
  }

  public get_user_template(owner:string,name:string){
    this.http.get<any>(this.constants.getUserTemplate+"/"+owner+"/"+name)
      .pipe(catchError(this.error.handelError))
      .subscribe(res=>{
        if(res.pattern!=null)
          this.screen = res.pattern
        this.update_grid(res.pattern)
      })
  }

}
