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
    const scanRef = ref(db, "scanner/searchBarcode");

    if (action === "confirm") {
      setPaymentComplete(true);
      await update(ref(db, `books/${barcode}`), { available: false });
      await set(scanRef, "");
      setTimeout(() => {
        setBook(null);
        setBarcode(null);
        setPaymentComplete(undefined);
      }, 1500);
    } else {
      setBook(null);
      setBarcode(null);
      await set(scanRef, "");
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary">Cashier Mode</h1>
        {!barcode && (
          <p className="text-textmuted mt-2">
            Scan a book to begin the transaction
          </p>
        )}
      </div>

      {/* Waiting for barcode */}
      {!barcode && (
        <p className="text-center text-gray-500 italic">
          Waiting for a barcode scan...
        </p>
      )}

      {/* Scanned code card */}
      {barcode && (
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-xl font-semibold text-textdark mb-1">
            Scanned Code
          </h2>
          <div className="px-5 py-2 bg-secondary text-white rounded-full shadow-md text-lg font-mono">
            {barcode}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-blue-500 text-center font-medium">
          Loading book details...
        </p>
      )}

      {/* Book details */}
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

      {/* No book found */}
      {barcode && !loading && !book && (
        <p className="text-red-500 mt-4 text-center font-medium">
          No book found for this barcode.
        </p>
      )}

      {/* Payment complete */}
      {paymentComplete && (
        <p className="mt-4 text-green-600 font-bold text-lg text-center">
          Payment Successful!
        </p>
      )}
    </div>
  );
}
