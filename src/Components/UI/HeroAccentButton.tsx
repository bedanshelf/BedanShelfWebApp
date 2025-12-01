import type { ReactNode } from "react";

interface HeroAccentBtnInterface {
  children: ReactNode;
  onClick: () => void;
}

export default function HeroAccentButton({
  children,
  onClick,
}: HeroAccentBtnInterface) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-primary cursor-pointer font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
    >
      {children}
    </button>
  );
}
