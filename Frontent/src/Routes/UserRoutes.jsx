import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Home, EditProfile, Login } from "../Components";
import ChatPage from "../pages/ChatPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatPage />} />
        <Route path="/profile" element={<Home />} />
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
