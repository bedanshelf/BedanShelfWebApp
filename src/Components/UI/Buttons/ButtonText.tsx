interface ButtonTextProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ButtonText({
  children,
  onClick,
  className = "",
}: ButtonTextProps) {
  return (
    <button
      onClick={onClick}
      className={`text-primary font-medium hover:underline cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
