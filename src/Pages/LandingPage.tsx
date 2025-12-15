import { useEffect, useState, useMemo } from "react";
import { ref, get } from "firebase/database";
import { db } from "../Config/FirebaseConfig";
import BookCard from "../Components/UI/Cards/BookCard";
import CardContainer from "../Components/UI/Cards/CardContainer";
import type { BookGenre } from "../Services/Types/BooksTypes";

interface Book {
  id: string;
  title: string;
  availability: boolean;
  genre: BookGenre[];
  price: number;
}

export default function LandingPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search + Filtering
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<BookGenre | "All">("All");

  // All unique genres extracted from books
  const [allGenres, setAllGenres] = useState<(BookGenre | "All")[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = ref(db, "books/");
        const snapshot = await get(booksRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const formattedBooks: Book[] = Object.keys(data).map((key) => ({
            id: key,
            title: data[key].title ?? "Untitled Book",
            availability: data[key].available ?? false,
            genre: data[key].genre ?? [],
            price: data[key].price ?? 0,
          }));

          setBooks(formattedBooks);

          // Extract all unique genres
          const genres = new Set<BookGenre>();

          formattedBooks.forEach((book) => {
            book.genre.forEach((g) => genres.add(g as BookGenre));
          });
          setAllGenres(["All", ...Array.from(genres)]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Memoized Filtering
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" ||
        book.genre.includes(selectedGenre as BookGenre);

      return matchesSearch && matchesGenre;
    });
  }, [books, search, selectedGenre]);

  return (
    <div className="px-6 py-4">
      {/* Search + Filter UI */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search books by title..."
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-primary focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Genre Dropdown */}
        <select
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring focus:ring-primary"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value as BookGenre)}
        >
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {isLoading && <p className="text-center py-6">Loading books...</p>}

      {/* Book Results */}
      {!isLoading && (
        <CardContainer>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                availability={book.availability}
                genre={book.genre}
                price={book.price}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full py-10">
              No books found.
            </p>
          )}
        </CardContainer>
      )}
    </div>
  );
}
