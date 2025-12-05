import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/loginroute.js';
import userRouter from './routes/upload.route.js';
const port = process.env.PORT || 5000;

const app = express();

connectDB()

app.use(cors())

app.use(express.json())


app.get('/',(req,res)=>{
  res.send("ok")
})

app.use("/api/login",adminRouter)
app.use('/api',userRouter)


app.listen(port,()=>{
  console.log(`server is running on ${port}`)
})