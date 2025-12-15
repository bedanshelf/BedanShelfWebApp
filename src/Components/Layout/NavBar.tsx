import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../Services/AuthService";

interface NavItem {
  name: string;
  path: string;
  roles?: string[]; // optional: roles allowed to see this link
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logoutUser();
    logout();

    navigate("/login", { replace: true });
  };

  const goTo = (path: string) => {
    navigate(path, { replace: true });
    setIsOpen(false); // close mobile menu after navigation
  };

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Encode", path: "/books/encode", roles: ["encoder", "admin"] },
    { name: "Cashier", path: "/books/cashier", roles: ["cashier", "admin"] },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-primary text-background sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="text-xl font-bold tracking-wide cursor-pointer"
          onClick={() => goTo("/")}
        >
          BedanShelf
        </div>

        {/* Mobile Burger */}
        <button
          className="fixed top-3.5 right-4 z-50 focus:outline-none text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`
      flex flex-col fixed top-0 left-0 h-full w-full max-w-[425px] bg-primary text-background shadow-xl
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        {/* Account Section */}
        {user && (
          <div className="px-4 py-6 border-b border-secondary/30">
            <h2 className="text-lg font-semibold">{`Hello, ${
              user?.name || "user"
            }`}</h2>
            <p className="text-sm opacity-70">
              {user?.role
                .map(
                  (r) => r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
                )
                .join(", ")}
            </p>
          </div>
        )}

        {/* Navigation Items */}
        <ul className="flex flex-col flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            if (
              item.roles &&
              !user?.role.some((r) => item.roles?.includes(r))
            ) {
              return null;
            }
            return (
              <li
                key={item.name}
                className={`cursor-pointer p-2 hover:text-secondary transition ${
                  isActive(item.path) ? "bg-secondary/20 rounded" : ""
                }`}
                onClick={() => goTo(item.path)}
              >
                {item.name}
              </li>
            );
          })}

          {user && (
            <button
              className="mt-auto w-full hover:bg-secondary/90 cursor-pointer bg-secondary text-primary py-2 rounded font-semibold"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
