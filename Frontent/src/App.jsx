import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
const App = () => {
  return (
    <>
      <Router>
        <UserRoutes />
        <AdminRoutes />
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
