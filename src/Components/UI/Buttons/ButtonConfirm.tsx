interface ButtonConfirmProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ButtonConfirm({
  children,
  onClick,
  className = "",
}: ButtonConfirmProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
