import { Route, Routes } from "react-router-dom";
import MainPageLayout from "./Layout/MainPageLayout";
import NotFound from "../Pages/NotFound";
import LandingPage from "../Pages/LandingPage";
import ProtectedRoute from "../Routes/ProtectedRoute";
import LoginPage from "./Auth/LoginPage";
import HomePage from "../Pages/HomePage";
import RoleProtectedRoute from "../Routes/RoleProtectedRoute";
import EncodePage from "../Pages/EncodePage";
import CashierPage from "../Pages/CashierPage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/books" element={<MainPageLayout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="encode"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "encoder"]}>
              <EncodePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="cashier"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "cashier"]}>
              <CashierPage />
            </RoleProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
