import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConstantsService} from "./constants.service";
import {GameStartResponse} from "../models/GameStartResponse";
import {GameResponse} from "../models/GameResponse";
import {Point} from "../models/point";
import {catchError, EMPTY} from "rxjs";
import {ToaserService} from "../toaster/toaser.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,private constants: ConstantsService,private toaster:ToaserService) {
    this.create_empty_grid(this.grid_size)
  }

  private create_empty_grid(size:number){
    this.mat = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j < size; j++) {
        row[j]=false
      }
      this.mat[i]=row
    }
  }

  public mat:boolean[][] = []
  public game_id:string = ""
  public grid_size:number = 51
  public middle_point:number[] = [0,0]
  private handelError = this._handleError.bind(this)

  public change_state(x:number,y:number){
    this.mat[x][y] = !this.mat[x][y]
  }

  private update_grid(grid_to_set:Point[]){
    this.create_empty_grid(this.grid_size)
    let delta = Math.floor((this.grid_size/2))

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

  private grid_to_point_array(grid:boolean[][]):Point[]{
    let delta = Math.floor((this.grid_size/2))
    let ret:Point[] = []
    for(let i =0 ;i<grid.length;i++){
      for(let j=0;j<grid[i].length;j++){
        if(grid[i][j]){
          let p = new Point()
          p.x = i-delta
          p.y = j-delta
          ret.push(p)
        }
      }
    }
    return ret
  }

  public start_game(){
  this.http.post<GameStartResponse>(this.constants.startGame,{seed:this.grid_to_point_array(this.mat),running_state:false})
    .pipe(catchError(this.handelError))
    .subscribe(res=>this.game_id = res.game_id)
  }

  public one_step(){
    this.http.post<GameResponse>(this.constants.oneStepGame,{uuid:this.game_id})
      .pipe(catchError(this.handelError))
      .subscribe(res=>{
      if(res.current_state!=null)
        this.update_grid(res.current_state)
    })
  }

  public stop_game(){
    this.http.post<GameResponse>(this.constants.stopGame,{uuid:this.game_id})
      .pipe(catchError(this.handelError))
      .subscribe(res=>{
      if(res.current_state!=null)
        this.update_grid(res.current_state)
    })
  }

  public get_template(name:string){
    this.http.get<any>(this.constants.templateByName+"/"+name)
      .pipe(catchError(this.handelError))
      .subscribe(res=>{
      if(res.pattern!=null)
        this.update_grid(res.pattern)
    })
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toaster.show('error in http request',error.error)
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.toaster.show('error in http request',error.error)
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return EMPTY
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
