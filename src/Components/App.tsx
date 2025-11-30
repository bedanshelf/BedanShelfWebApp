import { Route, Routes } from "react-router-dom";
import MainPageLayout from "./Layout/MainPageLayout";
import NotFound from "../Pages/NotFound";
import LandingPage from "../Pages/LandingPage";
import ProtectedRoute from "../Routes/ProtectedRoute";
import LoginPage from "./Auth/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPageLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
