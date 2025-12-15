import { useEffect, useState } from "react";
import { db } from "../Config/FirebaseConfig";
import { ref, onValue, set, get } from "firebase/database";
import GenreTags from "../Components/UI/Tags/GenreTags";
import BarcodeStatusCard from "../Components/UI/Cards/BarcodeStatusCard";
import ButtonConfirm from "../Components/UI/Buttons/ButtonConfirm";
import ButtonCancel from "../Components/UI/Buttons/ButtonCancel";

// All genres
const ALL_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Thriller",
  "Horror",
  "Romance",
  "Historical",
  "Young Adult",
  "Children",
  "Biography",
  "Autobiography",
  "Self-Help",
  "Business",
  "Philosophy",
  "Religion",
  "Poetry",
  "Graphic Novel",
  "Manga",
  "Educational",
  "Reference",
  "Art",
  "Travel",
  "Health",
  "Cooking",
];

export default function EncodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [bookData, setBookData] = useState({
    title: "",
    genre: [] as string[], // MULTIPLE GENRES
    price: "",
  });
  const [alreadyExists, setAlreadyExists] = useState<Boolean>(false);

  // Listen for barcode from ESP32
  useEffect(() => {
    const barcodeRef = ref(db, "scanner/encodeBarcode");

    const unsubscribe = onValue(barcodeRef, (snapshot) => {
      const code = snapshot.val();
      if (code) {
        checkBookExists(code);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkBookExists = async (code: string) => {
    if (!code) return false;

    try {
      const bookRef = ref(db, `books/${code}`);
      const snapshot = await get(bookRef);

      if (snapshot.exists()) {
        setAlreadyExists(true); // book already exists
        const data = snapshot.val();
        setBarcode(code);
        setBookData({
          title: data.title || "",
          genre: data.genre || [],
          price: data.price?.toString() || "",
        });
        return true;
      } else {
        setAlreadyExists(false); // book does not exist
        setBookData({ title: "", genre: [], price: "" });
        setBarcode(code);
        return false;
      }
    } catch (err) {
      console.error("Error checking book existence:", err);
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const cancelEncode = async () => {
    try {
      // Clear barcode in Firebase (important so ESP32 can scan again)
      await set(ref(db, "scanner/encodeBarcode"), "");

      // Reset local UI state
      setBarcode("");
      setBookData({ title: "", genre: [], price: "" });
      setAlreadyExists(false);
    } catch (err) {
      console.error("Error cancelling encode:", err);
    }
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
      setAlreadyExists(false);
    } catch (err) {
      alert("Error saving book: " + err);
    }
  };

  // Compute remaining options
  const remainingGenres = ALL_GENRES.filter((g) => !bookData.genre.includes(g));

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-6">Book Encoding</h1>

      {/* BARCODE STATUS */}
      <BarcodeStatusCard
        barcode={
          barcode &&
          (!alreadyExists ? barcode : `Barcode (${barcode}) already exists.`)
        }
      />

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

          <div className="flex gap-3 mt-4">
            <ButtonConfirm onClick={saveBook}>Save Book</ButtonConfirm>
            <ButtonCancel onClick={cancelEncode}>Cancel</ButtonCancel>
          </div>
        </div>
      )}
    </div>
  );
}
