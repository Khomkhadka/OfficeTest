import React, { useState } from "react";
import { products as initialProducts } from "../assets/assets";

const EditData = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newData, setNewData] = useState({
    Product: "",
    Category: "",
    Quantity: "",
    Revenue: "",
    SalesDate: "",
  });

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!newData.Product) return alert("Enter product");
    setProducts([...products, newData]);
    setNewData({
      Product: "",
      Category: "",
      Quantity: "",
      Revenue: "",
      SalesDate: "",
    });
  };

  const deleteItem = (i) => {
    setProducts(products.filter((_, index) => index !== i));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">

      {/* ---------------- ADD BOX (Clean + Small) ---------------- */}
      <div className="mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-fit">
        <h3 className="font-semibold mb-3 text-lg">Add New Entry</h3>

        <div className="flex gap-2 flex-wrap">
          <input
            className="px-3 py-2 rounded-lg border text-sm"
            placeholder="Product"
            name="Product"
            value={newData.Product}
            onChange={handleChange}
          />
          <input
            className="px-3 py-2 rounded-lg border text-sm"
            placeholder="Category"
            name="Category"
            value={newData.Category}
            onChange={handleChange}
          />
          <input
            className="px-3 py-2 rounded-lg border text-sm"
            placeholder="Qty"
            type="number"
            name="Quantity"
            value={newData.Quantity}
            onChange={handleChange}
          />
          <input
            className="px-3 py-2 rounded-lg border text-sm"
            placeholder="Revenue"
            type="number"
            name="Revenue"
            value={newData.Revenue}
            onChange={handleChange}
          />
          <input
            className="px-3 py-2 rounded-lg border text-sm"
            placeholder="Date"
            type="date"
            name="SalesDate"
            value={newData.SalesDate}
            onChange={handleChange}
          />

          <button
            onClick={addItem}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            Add
          </button>
        </div>
      </div>

      {/* ---------------- TABLE (Premium Clean Look) ---------------- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Your Data</h2>

        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="pb-2">Product</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Qty</th>
              <th className="pb-2">Revenue</th>
              <th className="pb-2">Date</th>
              <th className="pb-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {products.map((item, i) => (
              <tr
                key={i}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl shadow-sm my-2"
              >
                <td className="p-3">{item.Product}</td>
                <td className="p-3">{item.Category}</td>
                <td className="p-3">{item.Quantity}</td>
                <td className="p-3">{item.Revenue}</td>
                <td className="p-3">{item.SalesDate}</td>

                <td className="p-3 text-center">
                  <button onClick={() => EditData()} className="px-3 py-1 text-xs bg-yellow-500 text-white rounded-lg mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(i)}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default EditData;
