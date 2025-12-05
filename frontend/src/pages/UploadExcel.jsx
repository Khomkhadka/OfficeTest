import React, { useState } from "react";
import axios from "axios"

const UploadExcel = () => {
  const [file,setFile] = useState([])
  
 
const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!file){
      alert ('No file Selected')
      return;
    }
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("http://localhost:4000/api/upload-excel", formData);
    const data = await res.json();
    
    console.log("Server response:", data);
    setFile(null);
      e.target.reset();
      alert('File uploaded')

  } catch (err) {
    console.error(err);
  }

  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[450px] flex flex-col items-center">
        
        <div className="text-5xl font-bold text-indigo-600 mb-3">+</div>

        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Upload Your Excel File
        </h2>

        <form encType='multipart/form-data'  className="flex flex-col space-y-4 w-full"  onSubmit={handleSubmit}>
          <input
            name="file"
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="border border-gray-300 rounded-lg p-2 cursor-pointer
                       focus:outline-none focus:ring focus:ring-indigo-300"
          />

          <button
          
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg text-lg hover:bg-indigo-700 transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadExcel;
