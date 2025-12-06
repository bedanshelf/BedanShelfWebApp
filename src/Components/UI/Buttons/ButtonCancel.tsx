interface ButtonCancelProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ButtonCancel({
  children,
  onClick,
  className = "",
}: ButtonCancelProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
