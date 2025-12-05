import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    "Product Name":{
        type:String,
        required:true
    },
    "Category":{
        type:String,
        required:true
    },
    "Quantity Sold":{
        type:Number,
        required:true
    },
   "Revenue":{
        type:Number,
        required:true
    },
    "Sales Date":{
        type:String,
        required:true,
    }
},{timestamps:true})

export const  Product=mongoose.model('Product',productSchema)