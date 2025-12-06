import { useEffect, useState } from "react";
import { db } from "../Config/FirebaseConfig";
import { ref, onValue, set } from "firebase/database";
import GenreTags from "../Components/UI/Tags/GenreTags";

// All genres
const ALL_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Romance",
  "Science",
  "Education",
  "History",
];

export default function EncodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [bookData, setBookData] = useState({
    title: "",
    genre: [] as string[], // MULTIPLE GENRES
    price: "",
  });

  // Listen for barcode from ESP32
  useEffect(() => {
    const barcodeRef = ref(db, "scanner/encodeBarcode");

    const unsubscribe = onValue(barcodeRef, (snapshot) => {
      const code = snapshot.val();
      if (code) {
        setBarcode(code);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Add genre tag
  const addGenre = (genre: string) => {
    if (!bookData.genre.includes(genre)) {
      setBookData({ ...bookData, genre: [...bookData.genre, genre] });
    }
  };

  // Remove genre tag
  const removeGenre = (genre: string) => {
    setBookData({
      ...bookData,
      genre: bookData.genre.filter((g) => g !== genre),
    });
  };

  // Save book
  const saveBook = async () => {
    if (!barcode) return alert("No barcode scanned.");

    const bookRef = ref(db, `books/${barcode}`);
    const payload = {
      barcode,
      title: bookData.title,
      genre: bookData.genre,
      price: parseFloat(bookData.price),
      available: true,
      createdAt: new Date().toISOString(),
    };

    try {
      await set(bookRef, payload);
      await set(ref(db, "scanner/encodeBarcode"), ""); // clear scanner
      alert("Book successfully saved!");
      setBookData({ title: "", genre: [], price: "" });
      setBarcode("");
    } catch (err) {
      alert("Error saving book: " + err);
    }
  };

  // Compute remaining options
  const remainingGenres = ALL_GENRES.filter((g) => !bookData.genre.includes(g));

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Book Encoding</h1>

      {/* BARCODE STATUS */}
      <div className="bg-card border border-secondary/40 p-4 rounded-lg w-full max-w-lg shadow">
        <h2 className="text-lg font-semibold text-textdark mb-2">
          Barcode Status:
        </h2>

        {barcode ? (
          <p className="text-green-600 font-bold">{barcode}</p>
        ) : (
          <p className="text-textmuted italic">Waiting for barcode...</p>
        )}
      </div>

      {/* FORM */}
      {barcode && (
        <div className="bg-card border border-secondary/40 mt-6 p-6 rounded-lg w-full max-w-lg shadow space-y-4">
          <h3 className="text-xl font-semibold text-textdark">
            Book Information
          </h3>

          {/* Title */}
          <div>
            <label className="block text-textdark mb-1">Title</label>
            <input
              name="title"
              value={bookData.title}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-secondary/40"
              placeholder="Enter book title"
            />
          </div>

          {/* Genre as tags + selector */}
          <div>
            <label className="block text-textdark mb-1">Genre</label>

            {/* Selected tags */}
            <GenreTags
              genres={bookData.genre}
              onRemove={removeGenre}
              removable
            />
            {/* Selector for remaining genres */}
            {remainingGenres.length > 0 && (
              <select
                value=""
                onChange={(e) => addGenre(e.target.value)}
                className="w-full p-3 rounded border border-secondary/40"
              >
                <option value="">Select genre</option>
                {remainingGenres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-textdark mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={bookData.price}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-secondary/40"
              placeholder="Enter price"
            />
          </div>

          <button
            onClick={saveBook}
            className="w-full bg-primary text-white font-semibold p-3 rounded-lg hover:bg-primary/80 transition"
          >
            Save Book
          </button>
        </div>
      )}
    </div>
  );
}
