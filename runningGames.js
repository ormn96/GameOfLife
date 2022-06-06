// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export{add_game,delete_game,get_game}
const games = new Map()
const { v4: uuidv4 } = require('uuid');


const add_game = (game)=>{
    let uuid = uuidv4()
    while(games.has(uuid))
        uuid = uuidv4()
    games.set(uuid,game)
    return uuid
}

const delete_game = (uuid)=>{
    games.delete(uuid)
    return uuid
}

const get_game = (uuid)=>{
    let game = games.get(uuid)
    if(!game)
        throw "game id not found"
    return game
}