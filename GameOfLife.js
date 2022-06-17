import {SparseMatrixBool} from "./sparseMatrix.js";
import {floor} from "mathjs";

export class GameOfLife{

    constructor(initial_seed,after_generation_callback,game_over_callback,start_running_state) {
        this.after_generation_callback = after_generation_callback
        this.game_over_callback=game_over_callback
        this.initial_seed = this.parse_initial_seed(initial_seed)
        this.current = this.initial_seed.dup()
        this.set_rate(1)
        this.running_state = start_running_state
        if(start_running_state){
            this.runner = setInterval(()=>this.next_generation(),this.rate)
        }
        this.generation = 0
    }
    parse_initial_seed(initial_seed){
        if(initial_seed instanceof SparseMatrixBool)
            return initial_seed
        return SparseMatrixBool.from_point_array(initial_seed)
    }



    get_current_state(){
        return this.current.to_point_array()
    }

    set_rate(rate){
        if(rate <= 0 )
            return
        this.rate = floor(1000/rate)
        if(this.running_state){
            clearInterval(this.runner)
            this.runner = setInterval(()=>this.next_generation(),this.rate)
        }
    }

    game_control(control){
        switch (control.toLowerCase()) {
            case 'resume':
                if(!this.running_state){
                    this.runner = setInterval(()=>this.next_generation(),this.rate)
                    this.running_state = true
                }
                break
            case 'pause':
                if(this.running_state){
                    this.running_state = false
                    clearInterval(this.runner)
                }
                break
            case 'reset':
                if(this.running_state){
                    this.running_state = false
                    clearInterval(this.runner)
                }
                this.reset_game()
                break
            case 'one_step':
                this.next_generation()
                break
            default:
                throw "unknown operation"
        }
    }

    reset_game(){
        this.current = this.initial_seed.dup()
    }


    next_generation(){
        this.generation++
        const cells_to_check = new SparseMatrixBool()
        this.current.forEach((x,y)=>{
            for (let i = -1;i<=1;i++){
                for (let j = -1;j<=1;j++){
                    cells_to_check.set(x+i,y+j,true)
                }
            }
        })
        const changes = []
            
        cells_to_check.forEach((x,y)=>{
            let num_neighbors = 0
            for (let i = -1;i<=1;i++){
                for (let j = -1;j<=1;j++){
                    if(i===0 && j===0) continue
                    if( this.current.get(x+i,y+j) ) num_neighbors+=1;
                }
            }

            let cur_state = this.current.get(x,y)
            let next_state = gen_rule(cur_state,num_neighbors)
            if(cur_state!==next_state){
                changes.push(new Point(x,y,next_state))
            }
        })

        changes.forEach(value => this.current.set(value.x,value.y,value.next_val))
        if(this.running_state) {
            this.after_generation_callback(this, changes)
        }

        if(this.current.m.size === 0 ){
            this.game_control('pause')
            this.game_over_callback()
        }
    }

}

const gen_rule = (cur_state,number_of_neighbors)=>{
    if(cur_state){
        return number_of_neighbors >= 2 && number_of_neighbors <= 3
    }
    return number_of_neighbors === 3
}

class Point{
    constructor(x,y,next_val) {
        this.x = x
        this.y = y
        this.next_val = next_val
    }
}