import express from 'express'
import multer from 'multer';
import { exceltoJson, getData } from '../conntroller/uploadexcel.controller.js';

const userRouter=express.Router();
const upload=multer({dest:'uploads/'});


userRouter.post('/upload-excel',upload.single('file'),exceltoJson
);
export default userRouter;