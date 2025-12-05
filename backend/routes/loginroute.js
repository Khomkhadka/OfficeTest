import express from "express";
import { Login, register } from "../conntroller/login.js";
import { authenticate } from "../middleware/auth.js";

const adminRouter = express.Router()

adminRouter.post('/register',register)
adminRouter.post("/login",Login)

// protect route
adminRouter.get("/dashboard",authenticate,(req,res)=>{
    res.json({message:"access granted",user:req.user})
})

export default adminRouter