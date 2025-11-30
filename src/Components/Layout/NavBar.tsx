import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);  

  return (
    <nav className="bg-primary text-background sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold tracking-wide">Bedan BookShop</div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li className="hover:text-secondary cursor-pointer">Home</li>
          <li className="hover:text-secondary cursor-pointer">Books</li>
          <li className="hover:text-secondary cursor-pointer">About</li>
          <li className="hover:text-secondary cursor-pointer">Contact</li>
        </ul>

        <button className="md:hidden focus:outline-none">☰</button>
      </div>
    </nav>
  );
}
