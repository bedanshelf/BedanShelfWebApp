import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Components/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Context/AuthContext.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </BrowserRouter>
);
