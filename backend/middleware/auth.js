import jwt from "jsonwebtoken";

export const authenticate = async (req,res,next)=>{
    
    const token = req.headers.authorization.split(" ")[1]
    
    try {
        if(!token){
            res.json("token not provided")
        }
        
        const secretKey = process.env.JWT_KEY
        const decoded = jwt.verify(token,secretKey)
        req.user = decoded 
        next()
        
    } catch (error) {
        res.json({message:"invalid Token"})
    }
}