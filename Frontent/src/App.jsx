import {
  Home,
  EditProfile,
  Login,
  AdminLogin,
  EditUser,
  Error,
  Dashboard,
} from "./Components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          {/* Error Route */}
          <Route path="*" element={<Error />} />
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
