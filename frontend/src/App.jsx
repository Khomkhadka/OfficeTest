import React, { useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UploadExcel from './pages/UploadExcel';
import EditData from './pages/EditData';
import Login from './pages/Login';
import { useContext } from 'react';
import { AuthContext } from './context/storeContext';


function App() {
  // default true to show navbar
  const {user} = useContext(AuthContext)

  return (
    <div className="flex h-screen">

      {user ? (
        <>
          <Navbar />
          <div className="flex-1 p-5 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<UploadExcel />} />
              <Route path="/edit" element={<EditData />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          {/* If you want login page here */}
          <Route path="/login" element={<Login setIsActive={true}/> } /> 
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

    </div>
  );
}

export default App;
