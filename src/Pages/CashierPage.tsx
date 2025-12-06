import { useEffect, useState } from "react";
import { ref, onValue, get } from "firebase/database";
import { db } from "../Config/FirebaseConfig"; // your initialized firebase

interface Book {
  title: string;
  price: number;
  genre: string;
}

export default function CashierPage() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanRef = ref(db, "scans/current");

    // Listen to incoming barcode scans
    const unsubscribe = onValue(scanRef, async (snapshot) => {
      const scannedCode = snapshot.val();

      console.log("Scanned barcode:", scannedCode);

      if (scannedCode) {
        setBarcode(scannedCode);
        loadBookData(scannedCode);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch book info from realtime database
  async function loadBookData(code: string) {
    setLoading(true);

    const bookRef = ref(db, `books/${code}`);
    const snapshot = await get(bookRef);

    if (snapshot.exists()) {
      setBook(snapshot.val());
    } else {
      setBook(null); // no data for that barcode
    }

    setLoading(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cashier Mode</h1>

      {!barcode && (
        <p className="text-gray-500">Waiting for a barcode scan...</p>
      )}

      {barcode && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Scanned Code</h2>
          <p className="text-lg">{barcode}</p>
        </div>
      )}

      {loading && <p className="text-blue-500">Loading book details...</p>}

      {book && (
        <div className="mt-6 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p>Genre: {book.genre}</p>
          <p className="text-green-600 font-bold text-lg">₱{book.price}</p>
        </div>
      )}

      {barcode && !loading && !book && (
        <p className="text-red-500 mt-4">No book found for this barcode.</p>
      )}
    </div>
  );
}
