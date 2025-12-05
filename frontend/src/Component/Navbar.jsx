import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/storeContext";

const Navbar = () => {
  const {logout} = useContext(AuthContext)
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">

      {/* Header + Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Menu</h2>
      
      </div>

      {/* Nav Menu */}
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-2 rounded-md cursor-pointer ${
                isActive ? "bg-blue-600 " : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
            
          </NavLink>
          
        </li>

        <li>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `block p-2 rounded-md cursor-pointer ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Upload Excel
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/edit"
            className={({ isActive }) =>
              `block p-2 rounded-md cursor-pointer ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Edit Data
          </NavLink>
        </li>
      </ul>
         <button
        onClick={logout}
        className="w-full sm:mt-150 md:mt-120 bg-red-600 hover:bg-red-700 p-2 rounded transition text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
