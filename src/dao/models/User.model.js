import mongoose, { Schema } from "mongoose";
import config from "../../config/dotenvConfig.js";
import { logger } from "../../utils/logger.js";

const collection = "users";

const connection =  mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@codercluster.qyce1yj.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`, err=>{
    if(err) console.log(err);
    else logger.info("Connected to Mongo on User.model.js")
})

const schema = new mongoose.Schema({
    name:String,
    adress:String,
    age:Number,
    phone_number:String,
    imageURL:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    cart:Array,
})

const userModel = mongoose.model(collection,schema)

export default userModel