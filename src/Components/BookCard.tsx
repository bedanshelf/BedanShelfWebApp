import BookCardBadge from "./BookCardBadge";
import NoImagePlaceHolder from "/No-Image-Placeholder.png";

// These types can be exported if need for reference
export type BookAvailability = "Available" | "Unavailable";
export type BookGenre =
  | "none"
  | "Fiction"
  | "Non-Fiction"
  | "Fantasy"
  | "Science Fiction"
  | "Mystery"
  | "Thriller"
  | "Horror"
  | "Romance"
  | "Historical"
  | "Young Adult"
  | "Children"
  | "Biography"
  | "Autobiography"
  | "Self-Help"
  | "Business"
  | "Philosophy"
  | "Religion"
  | "Poetry"
  | "Graphic Novel"
  | "Manga"
  | "Educational"
  | "Reference"
  | "Art"
  | "Travel"
  | "Health"
  | "Cooking";

interface BookCardProps {
  title?: string;
  image?: string;
  genre?: BookGenre[];
  price?: number;
  availability?: BookAvailability;
}

export default function BookCard({
  title = "No title",
  image = NoImagePlaceHolder,
  genre = ["none"],
  price = 0,
  availability = "Available",
}: BookCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer border border-secondary/30 max-w-3xs w-10/12">
      <img src={image} className="rounded-lg mb-4 h-48 w-full object-cover" />

      <BookCardBadge status={availability}></BookCardBadge>
      <h3 className="font-semibold text-lg text-textdark mt-2.5">{title}</h3>
      <h4 className="font-thin text-sm italic text-textdark">
        {genre.join(", ")}
      </h4>
      <p className="text-primary font-bold mt-2">₱{price.toFixed(2)}</p>
    </div>
  );
}
