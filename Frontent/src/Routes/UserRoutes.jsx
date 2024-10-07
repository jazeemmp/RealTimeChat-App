import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {  EditProfile, Login } from "../Components";
import ChatPage from "../pages/ChatPage";
import Profile from "../Components/user/Profile/Profile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

function ProtectedRoute() {
  const auth = localStorage.getItem("token");
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default UserRoutes;
