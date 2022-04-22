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

export const save_template = async (name,template) =>{
    await init()
    if(template instanceof SparseMatrixBool)
        templates_collection.insertOne({name:name,pattern:template.to_point_array()}).then(log_add).catch(err_add)
    else
        templates_collection.insertOne({name:name,pattern:template}).then(log_add).catch(err_add)
}

export const get_template_by_name = async (name) => {
    await init()
    return templates_collection.findOne({name:name},{projection:{_id:0}})
}

export const get_all_templates_names = async () => {
    await init()
    return templates_collection.find({},{projection:{_id:0,name:1}}).map(v=>v.name).toArray()
}

export const save_user_template = async (username,name,template) =>{
    await init()
    users_templates_collection.insertOne({name:name,owner:username,pattern:template.to_point_array()}).then(log_add).catch(err_add)
}

export const get_user_templates_by_username = async (username) => {
    await init()
    return users_templates_collection.find({owner:username},{projection:{_id:0}}).toArray()
}

export const get_user_templates_by_name = async (name) => {
    await init()
    return users_templates_collection.find({name:name},{projection:{_id:0}}).toArray()
}
