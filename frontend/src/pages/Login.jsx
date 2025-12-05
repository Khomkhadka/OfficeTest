import React, { useState } from "react";
import { AuthContext } from "../context/storeContext";
import axios from "axios";
import { useContext } from "react";

const Login = () => {
  const { adminLogin } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username,setuserName] = useState("");
  const [login, setLogin] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post("http://localhost:4000/api/login/login",{email,password});
      adminLogin(res.data.token, res.data.user)
      // setLogin(true)
      
      alert("login successful")
    } catch (error) {
      alert("login failed")
      
    }

  };
   const handleRegister = async (e) => {
    e.preventDefault();
   
    const reister = await axios.post("http://localhost:4000/api/login/register",{username,email,password});
    setLogin(true)
   };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 w-full">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 ">
        {login 
        ? <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h2> 
        : <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
         Create Account
        </h2> }
       {login 
        ? <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
         : <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition"
            
          >
            Register
          </button>
        </form>
         }
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
         {login ? 
          <span onClick={()=>setLogin(false)} className="text-indigo-600 cursor-pointer hover:underline">
           Register
          </span>
          : <span onClick={()=>setLogin(true)} className="text-indigo-600 cursor-pointer hover:underline">
           Login
          </span>}
        </p>
        
        
      </div>
    </div>
  );
};

export default Login;
