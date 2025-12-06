import express from 'express'
import { getProduct, createProduct, update, deleteProduct } from '../conntroller/productController.js'

//POST/api/products
//GET/api/products
//PUT/api/products/:id
//DELETE/api/products/:id

const productRoute = express.Router()

productRoute.post('/',createProduct);
productRoute.get('/',getProduct)
productRoute.put('/:id',update)
productRoute.delete('/:id',deleteProduct)

export default productRoute