import BookCard from "../Components/UI/Cards/BookCard";
import type { BookGenre } from "../Services/Types/BooksTypes";
import CardContainer from "../Components/UI/Cards/CardContainer";

export default function LandingPage() {
  // Just a sample book genre
  const testGenreArr: BookGenre[] = [
    "Science Fiction",
    "Autobiography",
    "Business",
  ];

  return (
    <>
      <CardContainer>
        {/* Test books card with props */}
        <BookCard availability="Available" genre={testGenreArr}></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
      </CardContainer>
    </>
  );
}
