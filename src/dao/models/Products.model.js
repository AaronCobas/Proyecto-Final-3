import mongoose from "mongoose";
import config from "../../config/dotenvConfig.js"
import { logger } from "../../utils/logger.js";
const connection =  mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@codercluster.qyce1yj.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`, err=>{
    if(err) logger.error(err);
    else logger.info("Connected to Mongo on Products.model.js")
})

const collection = "products";
const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    id:{
        type:Number, //En los triggers de Atlas, puse un código que crea un id autoincremental
    }
})

const productModel = mongoose.model(collection,schema)

// const product = {
//     title: "Television",
//     description: "LG Smart TV",
//     code: `${Math.random().toString(16).slice(2)}`,
//     thumbnail: "https://www.lg.com/ar/images/televisores/md06198536/gallery/D-02.jpg",
//     price:5000,
//     stock: 500,
// }

// productModel.create(product)

export default productModel