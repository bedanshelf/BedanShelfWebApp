import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import ButtonPrimary from "../UI/Buttons/ButtonPrimary";
import ButtonText from "../UI/Buttons/ButtonText";
import { loginUser, registerUser } from "../../Services/AuthService";

interface Inputs {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);

  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    password: "",
    name: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      navigate("/books", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (register) {
        // REGISTER USER
        await registerUser(
          inputs.email,
          inputs.password,
          inputs.name ?? "",
          inputs.role ?? "user"
        );

        alert("Registration Successful! Please login.");
        setRegister(false);
        return;
      }

      // LOGIN USER
      const loggedInUser = await loginUser(inputs.email, inputs.password);

      login(loggedInUser);
      navigate("/books", { replace: true });
    } catch (e: any) {
      alert(e.message);
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card shadow-lg rounded-2xl p-8 w-full max-w-md border border-secondary/30">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          {register ? "Register to BedanShelf" : "Welcome to BedanShelf"}
        </h1>
        <p className="text-center text-textmuted mb-8">
          {register ? "" : "Sign in to continue"}
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* NAME FIELD — ONLY IN REGISTER MODE */}
          {register && (
            <div>
              <label className="block text-textdark font-medium mb-1">
                Full Name
              </label>
              <input
                value={inputs.name}
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-lg border border-secondary/40 bg-background text-textdark"
              />
            </div>
          )}

          {/* EMAIL */}
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
              className="w-full px-4 py-3 rounded-lg border border-secondary/40 bg-background text-textdark"
            />
          </div>

          {/* PASSWORD */}
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
              className="w-full px-4 py-3 rounded-lg border border-secondary/40 bg-background text-textdark"
            />
          </div>

          <ButtonPrimary onClick={handleSubmit}>
            {register ? "Register" : "Login"}
          </ButtonPrimary>
        </form>

        <p className="text-center text-textmuted mt-8 text-sm">
          {register ? (
            <ButtonText onClick={() => setRegister(false)}>
              Already have an account?
            </ButtonText>
          ) : (
            <>
              Don’t have an account?{" "}
              <ButtonText onClick={() => setRegister(true)}>
                Create one
              </ButtonText>
            </>
          )}
        </p>
        <p className="text-center text-textmuted mt-2 text-sm">or</p>
        <p
          onClick={() => navigate("/books", { replace: true })}
          className="text-center text-textmuted cursor-pointer hover:text-primary hover:underline mt-2 text-sm"
        >
          Browse without an account
        </p>
      </div>
    </div>
  );
}
