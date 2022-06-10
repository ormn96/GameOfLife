export{add_game,delete_game,get_game}
const games = new Map()



const add_game = (game,wsId)=>{
    games.set(wsId,game)
}

const delete_game = (uuid)=>{
    let game = games.get(uuid)
    if(!game)
        return
    game.game_control('stop')
    games.delete(uuid)
    console.log(`game deleted - ${uuid}`)
    return uuid
}

const get_game = (uuid)=>{
    let game = games.get(uuid)
    if(!game)
        throw "game id not found"
    return game
}