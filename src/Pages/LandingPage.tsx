import BookCard from "../Components/BookCard";
import type { BookGenre } from "../Components/BookCard";
import CardContainer from "../Layout/CardContainer";
import Footer from "../Layout/Footer";
import NavBar from "../Layout/NavBar";

export default function LandingPage() {
  const testGenreArr: BookGenre[] = [
    "Science Fiction",
    "Autobiography",
    "Business",
  ];

  return (
    <>
      <NavBar></NavBar>
      <CardContainer title="Title here">
        <BookCard availability="Available" genre={testGenreArr}></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
      </CardContainer>
      <Footer></Footer>
    </>
  );
}
