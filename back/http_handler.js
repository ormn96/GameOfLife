// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express')
const http = require('http')
const app = express()

const myLogger = function (req, res, next) {
    console.log(`handling request, type:"${req.method}", url:"${req.url}"`)
    next()
}
app.use(myLogger)
app.use(express.json())
import * as db from "./database.js"


const serv = http.createServer(app)

app.get("/templates/names",async (req,res)=>{
    const names = await db.get_all_templates_names()
    res.send(names)
})

app.get("/templates/single/:name",async (req,res)=>{
    const template = await db.get_template_by_name(req.params['name'])
    res.send(template)
})
app.put("/templates/single",async (req,res)=>{
    const body = req.body
    await db.save_template(body.name,body.pattern)
    res.status(200).send("")
})

app.get('/cookie',(req,res)=>{
    res.cookie("username",'or')
    res.send('1')

})
app.get('/test',(req,res)=>{
    console.log(req.headers.cookie)
    res.send('1')

})

const PORT = process.env.PORT || 3030
serv.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})