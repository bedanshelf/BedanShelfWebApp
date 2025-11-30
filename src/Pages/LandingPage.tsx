import BookCard from "../Components/UI/BookCard";
import type { BookGenre } from "../Components/UI/BookCard";
import CardContainer from "../Components/Layout/CardContainer";

export default function LandingPage() {
  const testGenreArr: BookGenre[] = [
    "Science Fiction",
    "Autobiography",
    "Business",
  ];

  return (
    <>
      <CardContainer title="Title here">
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
