import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AdminLogin, EditUser, Dashboard } from "../Components";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/edit-user/:id" element={<EditUser />} />
      </Route>
    </Routes>
  );
};

function ProtectedRoute() {
  const auth = localStorage.getItem("adminToken");
  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
export default AdminRoutes;
