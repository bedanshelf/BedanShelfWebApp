import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Components/App.tsx";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./Components/Context/AuthContext.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </HashRouter>
);
