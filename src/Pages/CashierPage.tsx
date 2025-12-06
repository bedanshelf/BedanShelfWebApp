import { useEffect, useState } from "react";
import { ref, onValue, get, set, update } from "firebase/database";
import { db } from "../Config/FirebaseConfig";
import type { Book } from "../Services/Models/Book";
import BookCard from "../Components/UI/Cards/BookCard";
import ButtonConfirm from "../Components/UI/Buttons/ButtonConfirm";
import ButtonCancel from "../Components/UI/Buttons/ButtonCancel";

export default function CashierPage() {
  const [barcode, setBarcode] = useState<string | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState<boolean>();

  // Listen for barcode scanner
  useEffect(() => {
    const scanRef = ref(db, "scanner/searchBarcode");

    const unsubscribe = onValue(scanRef, async (snapshot) => {
      const scannedCode = snapshot.val();

      if (scannedCode) {
        setBarcode(scannedCode);
        loadBookData(scannedCode);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load Book Info
  async function loadBookData(code: string) {
    setLoading(true);

    const bookRef = ref(db, `books/${code}`);
    const snapshot = await get(bookRef);

    if (snapshot.exists()) {
      setBook(snapshot.val());
    } else {
      setBook(null);
    }

    setLoading(false);
  }

  // Handle Confirm or Cancel
  const handlePaymentAction = async (action: "confirm" | "cancel") => {
    if (!book || !barcode) return;
    // Location of scanned barcode
    const scanRef = ref(db, "scanner/searchBarcode");

    if (action === "confirm") {
      // Fade-out animation
      setPaymentComplete(true);

      // Update availability in Firebase
      await update(ref(db, `books/${barcode}`), { available: false });
      await set(scanRef, "");

      // Optional: Reset after animation
      setTimeout(() => {
        setBook(null);
        setBarcode(null);
        setPaymentComplete(undefined);
      }, 1500);
    } else {
      // Cancel
      setBook(null);
      setBarcode(null);
      await set(scanRef, "");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cashier Mode</h1>

      {!barcode && (
        <p className="text-gray-500">Waiting for a barcode scan...</p>
      )}

      {barcode && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Scanned Code</h2>
          <div className="text-lg bg-textdark w-fit px-3 py-1 rounded-4xl text-white">
            {barcode}
          </div>
        </div>
      )}

      {loading && <p className="text-blue-500">Loading book details...</p>}

      {book && (
        <BookCard
          title={book.title}
          genre={book.genre}
          price={book.price}
          availability={book.available}
          className={`mx-auto transition-all duration-700 max-w-sm ${
            paymentComplete ? "opacity-0 scale-95" : "opacity-100"
          }`}
        >
          {!book.available && (
            <h1 className="font-bold text-red-600 italic mt-5 text-center">
              Sorry, this book is unavailable
            </h1>
          )}

          {book.available && (
            <ButtonConfirm
              className="mt-5"
              onClick={() => handlePaymentAction("confirm")}
            >
              Confirm Payment
            </ButtonConfirm>
          )}

          <ButtonCancel
            className="mt-3"
            onClick={() => handlePaymentAction("cancel")}
          >
            Cancel
          </ButtonCancel>
        </BookCard>
      )}

      {barcode && !loading && !book && (
        <p className="text-red-500 mt-4">No book found for this barcode.</p>
      )}

      {paymentComplete && (
        <p className="mt-4 text-green-600 font-bold text-lg text-center">
          Payment Successful!
        </p>
      )}
    </div>
  );
}
