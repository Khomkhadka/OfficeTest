import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    Product_Name:{ type: String, required: true, unique: true},
    Category:{ type: String, required: true},
    Quantity:{ type: String, required: true},
    Revenue_Sales:{ type: String, required: true},
    Date:{ type: String, required: true}
})

const dataModel = mongoose.models.data || model('data', dataSchema)

export default dataModel