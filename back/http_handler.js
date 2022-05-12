// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const app = express()

const myLogger = function (req, res, next) {
    console.log(`handling request, type:"${req.method}", url:"${req.url}"`)
    next()
}
app.use(myLogger)

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const cors = require('cors')
const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true,
}
app.use(cors(corsOptions))

import * as db from "./database.js"
import {GameOfLife} from "./GameOfLife.js";
import {add_game, get_game} from "./runningGames.js";


const serv = http.createServer(app)

app.get("/templates/preview",async (req,res)=>{
    const previews = await db.get_all_templates_preview()
    res.send(previews)
})

app.get("/templates/single/:name",async (req,res)=>{
    const template = await db.get_template_by_name(req.params['name'])
    res.send(template)
})
app.put("/templates/single",async (req,res)=>{
    const body = req.body
    await db.save_template(body.name,body.pattern,body.image)
    res.send("")
})

app.get("/templates/preview/user/name/:name",async (req,res)=>{
    const previews = await db.get_user_templates_preview_by_name(req.params['name'])
    res.send(previews)
})

app.get("/templates/preview/user/username/:username",async (req,res)=>{
    const previews = await db.get_user_templates_preview_by_username(req.params['username'])
    res.send(previews)
})

app.get("/templates/user/single/:username/:name",async (req,res)=>{
    const template = await db.get_user_template_pattern(req.params['username'],req.params['name'])
    res.send(template)
})

app.put("/templates/user/single",async (req,res)=>{
    const body = req.body
    await db.save_user_template(body.username,body.name,body.pattern,body.image)
    res.send("")
})

app.post("/game/start", (req,res)=>{
    const body = req.body
    let game = new GameOfLife(body.seed,(full,changes)=>{
        //TODO add web socket
    },body.running_state)
    let uuid = add_game(game)

    res.send({
        game_id:uuid
    })
})

app.post("/game/:operation", (req,res)=>{
    const body = req.body
    try {
        let game = get_game(body.uuid)
        game.game_control(req.params['operation'])
        res.send({
            current_state:game.get_current_state()
        })
    }catch (e) {
        res.status(400).send(e)
    }
})
//
// app.get('/cookie',(req,res)=>{
//     res.cookie("username",'or')
//     res.send('1')
//
// })
// app.get('/test',(req,res)=>{
//     console.log(req.headers.cookie)
//     res.send('1')
//
// })

const PORT = process.env.PORT || 3030
serv.listen(PORT,"localhost", () => {
    console.log(`Server is running on port: ${PORT}`)
})