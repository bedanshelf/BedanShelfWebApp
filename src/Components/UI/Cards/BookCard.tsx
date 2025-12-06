import BookCardBadge from "./BookCardBadge";
import NoImagePlaceHolder from "/No-Image-Placeholder.png";
import type { BookGenre } from "../../../Services/Types/BooksTypes";
import type { ReactNode } from "react";
import GenreTags from "../Tags/GenreTags";

interface BookCardProps {
  title?: string;
  image?: string;
  genre?: BookGenre[];
  price?: number;
  availability?: boolean;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}

export default function BookCard({
  title = "",
  image = NoImagePlaceHolder,
  genre = ["none"],
  price = 0,
  availability = true,
  className = "",
  imageClassName = "",
  children,
}: BookCardProps) {
  return (
    <div
      className={`bg-card rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer border border-secondary/30 max-w-3xs w-10/12 ${className}`}
    >
      <img
        src={image}
        className={`rounded-lg mb-4 h-48 w-full object-cover ${imageClassName}`}
      />

      <BookCardBadge status={availability}></BookCardBadge>
      <h3 className="font-semibold text-lg text-textdark mt-2.5 mb-2.5">
        {title == "" ? "No title" : title}
      </h3>
      <GenreTags genres={genre} />
      <p className="text-primary font-bold mt-3">₱{price.toFixed(2)}</p>
      {children}
    </div>
  );
}
