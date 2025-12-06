import { createContext, useState } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // Token state
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  //data
  const [products,setProducts] = useState([])

  // User state with safe JSON parse
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined") return null;
    return JSON.parse(data);
  });

  //Read
  const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/products");
    setProducts(response.data.products);
  } catch (error) {
    console.error("API Fetch Error:", error);
  }
};


  // Login function
  const adminLogin = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);

    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setToken("");
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, adminLogin, logout, products, fetchProducts }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
