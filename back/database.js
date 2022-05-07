import mongo from 'mongodb'
import {SparseMatrixBool} from "./sparseMatrix.js";

let connection = undefined
let templates_collection = undefined
let users_templates_collection = undefined
const uri = "mongodb+srv://admin:admin@gol.jen0m.mongodb.net/gol?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongo.ServerApiVersion.v1 });

const init = async ()=>{
    if (connection) return

    connection = await  client.connect();
    templates_collection = await client.db("game_of_life").collection("templates");
    users_templates_collection = await client.db("game_of_life").collection("user_templates");

}


const log_add = (r)=>{
    console.log("added",r)
}

const err_add = (e)=>{
    console.log("error_adding",e)
}

// export const save_template = async (name,template) =>{
//     await init()
//     if(template instanceof SparseMatrixBool)
//         templates_collection.insertOne({name:name,pattern:template.to_point_array()}).then(log_add).catch(err_add)
//     else
//         templates_collection.insertOne({name:name,pattern:template}).then(log_add).catch(err_add)
// }

export const get_template_by_name = async (name) => {
    await init()
    return templates_collection.findOne({name:name,owner:'SYSTEM'},{projection:{_id:0,pattern:1}})
}

export const get_all_templates_preview = async () => {
    await init()
    return templates_collection.find({owner:'SYSTEM'},{projection:{_id:0,name:1,image:1}}).map(v=>{return {name:v.name,image:v.image}}).toArray()
}

export const save_template = async (name,template,img) =>{
    await init()
    templates_collection.insertOne({name:name,owner:'SYSTEM',pattern:template,image:img}).then(log_add).catch(err_add)
}

export const save_user_template = async (username,name,template,img) =>{
    await init()
    templates_collection.insertOne({name:name,owner:username,pattern:template,image:img}).then(log_add).catch(err_add)
}

export const get_user_templates_preview_by_username = async (username) => {
    if(username==='SYSTEM')
        return []
    await init()
    return templates_collection.find({owner:username},{projection:{_id:0,pattern:0}}).map(v=>{return {name:v.name,owner:v.owner,image:v.image}}).toArray()
}

export const get_user_templates_preview_by_name = async (name) => {
    await init()
    return templates_collection.find({name:name},{projection:{_id:0,pattern:0}}).map(v=>{return {name:v.name,owner:v.owner,image:v.image}}).toArray()
}

export const get_user_template_pattern = async (username,name) => {
    if(username==='SYSTEM')
        return null
    await init()
    return templates_collection.findOne({name:name,owner:username},{projection:{_id:0,pattern:1}})
}
