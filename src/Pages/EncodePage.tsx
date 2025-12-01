import { useEffect, useState } from "react";
import { db } from "../Config/FirebaseConfig";
import { ref, onValue, set } from "firebase/database";

export default function EncodePage() {
  const [barcode, setBarcode] = useState<string>("");
  const [bookData, setBookData] = useState({
    title: "",
    genre: "",
    price: "",
  });

  // Listen for barcode from ESP32
  useEffect(() => {
    const barcodeRef = ref(db, "scanner/currentBarcode");

    const unsubscribe = onValue(barcodeRef, (snapshot) => {
      const code = snapshot.val();
      if (code) {
        setBarcode(code);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const saveBook = async () => {
    if (!barcode) return alert("No barcode scanned.");

    const bookRef = ref(db, `encodedBooks/${barcode}`);

    const payload = {
      barcode,
      title: bookData.title,
      genre: bookData.genre,
      price: parseFloat(bookData.price),
      createdAt: new Date().toISOString(),
    };

    try {
      await set(bookRef, payload);
      alert("Book successfully saved!");

      // Clear fields
      setBookData({ title: "", genre: "", price: "" });
      setBarcode("");
    } catch (err) {
      alert("Error saving book: " + err);
    }
  };

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

          <div>
            <label className="block text-textdark mb-1">Genre</label>
            <select
              name="genre"
              value={bookData.genre}
              onChange={handleInputChange}
              className="w-full p-3 rounded border border-secondary/40"
            >
              <option value="">Select genre</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Fantasy</option>
              <option>Romance</option>
              <option>Science</option>
              <option>Education</option>
              <option>History</option>
            </select>
          </div>

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
