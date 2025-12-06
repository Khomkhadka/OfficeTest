import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/storeContext.jsx";

const EditData = () => {
  const { fetchProducts } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newData, setNewData] = useState({
    "Product Name": "",
    Category: "",
    "Quantity Sold": "",
    Revenue: "",
    "Sales Date": "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [edit, setEdit] = useState({})

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    loadProducts();
    fetchProducts(); // optional, if your context has products
  }, []);

  const handleChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) setEditData({ ...editData, [name]: value });
    else setNewData({ ...newData, [name]: value });
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newData["Product Name"]) return alert("Enter product name");

    try {
      const res = await axios.post("http://localhost:4000/api/products", newData);
      setProducts([...products, res.data]);
      setNewData({
        "Product Name": "",
        Category: "",
        "Quantity Sold": "",
        Revenue: "",
        "Sales Date": "",
      });
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData(products[index]);
    
  };

  const saveEdit = async (id) => {
    try {
      const productId = editData._id;
      await axios.put(`http://localhost:4000/api/products/${productId}`, editData);
      fetchProducts()
      const updated = [...products];
      updated[editIndex] = editData;
      setProducts(updated);
      setEditIndex(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const cancelEdit = () => setEditIndex(null);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* ---------------- ADD NEW PRODUCT ---------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mb-10 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end" onSubmit={addItem}>
          <input
            name="Product Name"
            value={newData["Product Name"]}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded-lg"
          />
          <input
            name="Category"
            value={newData.Category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded-lg"
          />
          <input
            name="Quantity Sold"
            type="number"
            value={newData["Quantity Sold"]}
            onChange={handleChange}
            placeholder="Quantity Sold"
            className="border p-2 rounded-lg"
          />
          <input
            name="Revenue"
            type="number"
            value={newData.Revenue}
            onChange={handleChange}
            placeholder="Revenue"
            className="border p-2 rounded-lg"
          />
          <input
            name="Sales Date"
            type="date"
            value={newData["Sales Date"]}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </form>
      </div>

      {/* ---------------- PRODUCTS TABLE ---------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Products List</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity Sold</th>
              <th className="border p-2">Revenue</th>
              <th className="border p-2">Sales Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id} className="border-t">
                {editIndex === index ? (
                  <>
                    <td className="border p-2">
                      <input
                        name="Product Name"
                        value={editData["Product Name"]}
                        onChange={(e) => handleChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        name="Category"
                        value={editData.Category}
                        onChange={(e) => handleChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        name="Quantity Sold"
                        type="number"
                        value={editData["Quantity Sold"]}
                        onChange={(e) => handleChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        name="Revenue"
                        type="number"
                        value={editData.Revenue}
                        onChange={(e) => handleChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        name="Sales Date"
                        type="date"
                        value={editData["Sales Date"]}
                        onChange={(e) => handleChange(e, true)}
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className="border p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => saveEdit(item._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{item["Product Name"]}</td>
                    <td className="border p-2">{item.Category}</td>
                    <td className="border p-2">{item["Quantity Sold"]}</td>
                    <td className="border p-2">{item.Revenue}</td>
                    <td className="border p-2">{item["Sales Date"]}</td>
                    <td className="border p-2 flex gap-2 justify-center">
                      <button
                        onClick={() => startEdit(index)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditData;
