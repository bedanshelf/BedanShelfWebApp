import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const Login = () => {
    login({ user: "Pons", role: ["admin"] });

    navigate("/", { replace: true });
  };

  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <button
        className="p-4 bg-red-900 rounded-sm cursor-pointer"
        onClick={Login}
      >
        Login
      </button>
    </div>
  );
}
