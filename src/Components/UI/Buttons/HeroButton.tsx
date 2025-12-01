import type { ReactNode } from "react";

interface HeroBtnInterface {
  children: ReactNode;
  onClick: () => void;
}

export default function HeroButton({ children, onClick }: HeroBtnInterface) {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white px-6 py-3 cursor-pointer rounded-lg text-lg font-semibold hover:bg-primary/90 transition"
    >
      {children}
    </button>
  );
}
