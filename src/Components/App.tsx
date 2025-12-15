import { Route, Routes } from "react-router-dom";
import MainPageLayout from "./Layout/MainPageLayout";
import NotFound from "../Pages/NotFound";
import LandingPage from "../Pages/LandingPage";
import ProtectedRoute from "../Routes/ProtectedRoute";
import AdminRoute from "../Routes/AdminRoute";
import LoginPage from "./Auth/LoginPage";
import HomePage from "../Pages/HomePage";
import RoleProtectedRoute from "../Routes/RoleProtectedRoute";
import EncodePage from "../Pages/EncodePage";
import CashierPage from "../Pages/CashierPage";
import AdminPage from "../Pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/books" element={<MainPageLayout />}>
        <Route index element={<LandingPage />} />

        {/* 🔐 AUTH REQUIRED */}
        <Route element={<ProtectedRoute />}>
          {/* 🔒 ENCODER */}
          <Route
            path="encode"
            element={<RoleProtectedRoute allowedRoles={["admin", "encoder"]} />}
          >
            <Route index element={<EncodePage />} />
          </Route>

          {/* 💰 CASHIER */}
          <Route
            path="cashier"
            element={<RoleProtectedRoute allowedRoles={["admin", "cashier"]} />}
          >
            <Route index element={<CashierPage />} />
          </Route>

          {/* 👑 ADMIN */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
