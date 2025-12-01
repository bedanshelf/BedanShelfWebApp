import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import ButtonPrimary from "../UI/Buttons/ButtonPrimary";
import ButtonText from "../UI/Buttons/ButtonText";

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [register, setRegister] = useState<Boolean>(false);
  const [inputs, setInput] = useState<Inputs>({
    email: "",
    password: "",
  });

  const Login = () => {
    login({ user: "Pons", role: ["admin"] });

    navigate("/books", { replace: true });
  };

  const handleRegisterPage = () => {
    setRegister((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* CARD */}
      <div className="bg-card shadow-lg rounded-2xl p-8 w-full max-w-md border border-secondary/30">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          {register ? "Register to BedanShelf" : "Welcome to BedanShelf"}
        </h1>
        <p className="text-center text-textmuted mb-8">
          {register ? "" : "Sign in to continue"}
        </p>

        {/* FORM */}
        <form
          className="space-y-6"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <div>
            <label className="block text-textdark font-medium mb-1">
              Email
            </label>
            <input
              value={inputs.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-secondary/40 bg-background text-textdark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-textdark font-medium mb-1">
              Password
            </label>
            <input
              value={inputs.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-secondary/40 bg-background text-textdark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* FORGOT PASSWORD */}
          {!register && (
            <>
              <div className="flex justify-end">
                <a href="#" className="text-primary text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            </>
          )}
          <ButtonPrimary onClick={Login}>
            {register ? "Register" : "Login"}
          </ButtonPrimary>
          {/* LOGIN BUTTON */}
        </form>

        {/* Footer */}
        <p className="text-center text-textmuted mt-8 text-sm">
          {register ? (
            <ButtonText onClick={handleRegisterPage}>
              Already have an account?
            </ButtonText>
          ) : (
            <>
              Don’t have an account?{" "}
              <ButtonText
                onClick={handleRegisterPage}
                className="cursor-pointer"
              >
                Create one
              </ButtonText>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
