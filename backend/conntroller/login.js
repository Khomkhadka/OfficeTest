import { Admin } from "../modles/admin.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


// For Register 
export const register = async (req,res)=>{
    try {
        // checking inputfield is exist
        const {username,email,password} = req.body
        if (!email) {
           return res.json({message:"please! Fill the email"})
        } 
        else if(!password) {
             return res.json({message:"please! Fill the password"})
        } 
        else if(!username){
            return res.json({message:"please! Fill the name"})
        }
      
        // checking user exist 
        const existingUser = await Admin.findOne({email})

        if (existingUser) {
            return res.json("User already exist")
        } 
        // hashing password
        const hashPassword = await bcrypt.hash(password,10)

        //save 
        const admin = new Admin ({
            username,
            email,
            password: hashPassword
        })
        await admin.save();
        res.json("register successful")

    } catch (error) {
        res.json({message:"register failed",error:error.message})
    }
}


// For Login

export const Login = async (req,res)=>{
    const {email,password} = req.body

    // finding correct user email
    const userEmail = await Admin.findOne({email})
   try {
    if (!userEmail) {
        res.json("Use your correct Email")  
    } 

    // comparing password 
    const isCorrectPassword = await bcrypt.compare(password,userEmail.password)
    if (!isCorrectPassword) {
        res.json("Invalid password")
    } 

    // making Token with JWT 
    const token = jwt.sign({id:userEmail._id,email:userEmail.email},process.env.JWT_KEY,{expiresIn:"30d"})
    res.json({message:"token generated",token, user: {
                _id: userEmail._id,
                username: userEmail.username,
                email: userEmail.email
            }})


   } catch (error) {
    res.json({message:"Login Failed",error:error.message})
   }
}