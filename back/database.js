import mongo from 'mongodb'

let connection = undefined
let templates_collection = undefined
let saves_collection = undefined
const uri = "mongodb+srv://admin:admin@gol.jen0m.mongodb.net/gol?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongo.ServerApiVersion.v1 });

templates_collection = client.db("game_of_life").collection("templates");
saves_collection = client.db("game_of_life").collection("saves");
const init = async ()=>{
    if (connection) return

    connection = await  client.connect();
    templates_collection = await client.db("game_of_life").collection("templates");
    saves_collection = await client.db("game_of_life").collection("saves");

}


const t = (r)=>{
    console.log("done",r)
}

const err = (e)=>{
    console.log("error",e)
}

export const save_template = async (name,template) =>{
    await init()
    templates_collection.insertOne({name:name,pattern:template.to_point_array()}).then(t).catch(err)
}

export const get_template_by_name = async (name) => {
    await init()
    return templates_collection.findOne({name:name})
}
