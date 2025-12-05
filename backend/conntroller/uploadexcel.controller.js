import xlsx from 'xlsx'
import { Product } from '../modles/product.model.js';
export const exceltoJson=async(req,res)=>{
    try {
        const file=req.file
        const workbook=xlsx.readFile(file.path);
        const sheetName=workbook.SheetNames[0];
        const workSheet=workbook.Sheets[sheetName];
        const jsonData=xlsx.utils.sheet_to_json(workSheet);
        function excelDateToJSDate(excelDate) {
          const jsDate = new Date((excelDate - 25569) * 86400 * 1000);
          return jsDate.toISOString().split("T")[0];
        }
        const newData = jsonData.map((data) => ({
          "Product Name": data["Product Name"],
          "Category": data["Category"],
          "Quantity Sold": data["Quantity Sold"],
          "Revenue": data["Revenue"],
          "Sales Date": excelDateToJSDate(data["Sales Date"]),
        }));
          
        const saveData=await Product.insertMany(newData);
       await res.json({
            message:'Excel data uploaded successfully'
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export const getData=async(req,res)=>{
    try {
        const products=await Product.find()
        res.json({success:true,products})
    } catch (error) {
        res.json({error:error.message})
    }
}