import BookCard from "../Components/UI/BookCard";
import type { BookGenre } from "../Components/UI/BookCard";
import CardContainer from "../Components/UI/CardContainer";

export default function LandingPage() {
  const testGenreArr: BookGenre[] = [
    "Science Fiction",
    "Autobiography",
    "Business",
  ];

  return (
    <>
      <CardContainer>
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
