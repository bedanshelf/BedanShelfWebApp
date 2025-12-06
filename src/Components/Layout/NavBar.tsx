import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Role } from "../Context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const GoToEncodePage = () => {
    navigate("encode", { replace: true });
  };

  const GoToCashierPage = () => {
    navigate("cashier", { replace: true });
  };

  return (
    <nav className="bg-primary text-background sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">BedanShelf</div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li className="hover:text-secondary cursor-pointer">Home</li>
          <li className="hover:text-secondary cursor-pointer">Books</li>
          <li className="hover:text-secondary cursor-pointer">About</li>
          <li className="hover:text-secondary cursor-pointer">Contact</li>
          <li
            className="hover:text-secondary cursor-pointer"
            onClick={GoToEncodePage}
          >
            Encode
          </li>
          <li
            className="hover:text-secondary cursor-pointer"
            onClick={GoToCashierPage}
          >
            Cashier
          </li>
          {/* {user?.role.includes("encoder") && (
            <li className="hover:text-secondary cursor-pointer">Encode</li>
          )} */}
        </ul>

        <button className="md:hidden focus:outline-none">☰</button>
      </div>
    </nav>
  );
}
