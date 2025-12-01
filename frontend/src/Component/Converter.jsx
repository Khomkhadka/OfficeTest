import React, { useState } from "react";
import * as XLSX from "xlsx";

function Converter() {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const keys = parsedData[0];
      const rows = parsedData.slice(1).map((row) => {
        let obj = {};
        keys.forEach((key, i) => {
          obj[key] = row[i] || "";
        });
        return obj;
      });

      setJsonData(rows);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleChange = (rowIndex, field, value) => {
    const updated = [...jsonData];
    updated[rowIndex][field] = value;
    setJsonData(updated);
  };

  // New: Submit to backend
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/save-excel-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        alert("Data sent to backend successfully!");
      } else {
        alert("Failed to send data.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending data.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">Excel Upload & Edit</h2>

        {/* Upload Button */}
        <label className="bg-blue-600 text-white px-5 py-3 rounded-lg cursor-pointer font-medium hover:bg-blue-700 transition">
          Upload Excel File
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Editable Table */}
        {jsonData.length > 0 && (
          <>
            <div className="overflow-x-auto mt-6 mb-4">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    {Object.keys(jsonData[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border border-gray-300 text-left font-semibold"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {jsonData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                      {Object.entries(row).map(([field, value], colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 px-3 py-2"
                        >
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleChange(rowIndex, field, e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit to Backend
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Converter;
