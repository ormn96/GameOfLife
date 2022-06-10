// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const {Server} = require("ws");
const { v4: uuidv4 } = require('uuid');
import {delete_game} from "./runningGames.js";
let wss = undefined

const livingUsers = new Map()

const init = (serv)=>{
    wss = new Server({server:serv})

    wss.on('connection', (ws) => {
        console.log('Client connected');
        let userID = uuidv4()
        livingUsers.set(userID,ws)
        ws.send(JSON.stringify({key:'init',value:userID}))
        ws.on('close', handleDisconnect(userID));
    })
}

const handleDisconnect = (userID)=>{
    return ()=>{
        console.log(`Client disconnected - ${userID}`)
        livingUsers.delete(userID)
        delete_game(userID)
    }
}

const send = (userID,key,value)=>{
    if (!livingUsers.has(userID)) return
    livingUsers.get(userID).send(JSON.stringify({key:key,value:value}))
    console.log('sent',userID,{key:key,value:value})
}

export {init,send}
