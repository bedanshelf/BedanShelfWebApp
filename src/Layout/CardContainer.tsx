import type { ReactNode } from "react";

interface CardContainerProps {
  children?: ReactNode;
  title?: string;
}

export default function CardContainer({ children, title }: CardContainerProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-textdark">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </section>
  );
}
