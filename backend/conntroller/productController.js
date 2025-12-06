// CURD 


import { Product } from "../modles/product.model.js"

export const getProduct = async (req,res)=>{
    try {
        const products = await Product.find()
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,error:error.message})
    }

}

export const createProduct = async (req,res)=>{
    try {
        const newProduct = await Product.create(req.body)
        res.json({success:true,newProduct})
        
    } catch (error) {
        res.json({success:false,error:error.message})
    }
}

export const update = async (req,res)=>{
    try {
        const updateProduct = await Product.findOneAndUpdate(req.params.id,req.body,{new:true})
        res.json({success:true,updateProduct})
        
    } catch (error) {
        res.json({succes:false,error:error.message})
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const deleteData = await Product.findByIdAndDelete(req.params.id)
        res.json({success:true,deleteData})
        
    } catch (error) {
        res.json({success:false,error:error.message})
    }
}