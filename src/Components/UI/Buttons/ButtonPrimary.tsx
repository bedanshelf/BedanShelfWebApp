interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ButtonPrimary({
  children,
  onClick,
  className = "",
}: ButtonPrimaryProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
