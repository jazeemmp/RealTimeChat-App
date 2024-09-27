import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/user/Home/Home";
import EditProfile from "./Components/user/EditProfile/EditProfile";
import Error from "./Components/Error/Error";
import Login from "./Components/user/Login/Login";
import { Toaster } from "sonner";
import "./App.css";
import Dashboard from "./Components/admin/Dashboard/Dashboard";
import AdminLogin from "./Components/admin/AdminLogin/AdminLogin";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/login" element={<AdminLogin/>}/>
        </Routes>
      </Router>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          className: "p-4 my-2",
        }}
      />
    </>
  );
};

export default App;
