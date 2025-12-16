import { useEffect, useState } from "react";
import { ref, onValue, get, set, update } from "firebase/database";
import { db } from "../Config/FirebaseConfig";
import type { Book } from "../Services/Models/Book";
import BookCard from "../Components/UI/Cards/BookCard";
import ButtonConfirm from "../Components/UI/Buttons/ButtonConfirm";
import ButtonCancel from "../Components/UI/Buttons/ButtonCancel";

interface CartItem {
  barcode: string;
  book: Book;
}

export default function CashierPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  /* 🔁 Listen for barcode scanner */
  useEffect(() => {
    const scanRef = ref(db, "scanner/searchBarcode");

    const unsubscribe = onValue(scanRef, async (snapshot) => {
      const scannedCode = snapshot.val();
      if (!scannedCode) return;

      // Prevent duplicate scans
      if (cart.some((item) => item.barcode === scannedCode)) {
        await set(scanRef, "");
        return;
      }

      loadBookData(scannedCode);
      await set(scanRef, ""); // reset scanner value
    });

    return () => unsubscribe();
  }, [cart]);

  /* 📚 Load book and add to cart */
  async function loadBookData(code: string) {
    setLoading(true);

    const bookRef = ref(db, `books/${code}`);
    const snapshot = await get(bookRef);

    if (snapshot.exists()) {
      const book = snapshot.val();

      if (!book.available) {
        alert("Book is unavailable");
      } else {
        setCart((prev) => [...prev, { barcode: code, book }]);
      }
    } else {
      alert("Book not found");
    }

    setLoading(false);
  }

  /* ✅ Confirm payment for ALL books */
  const handleConfirmPayment = async () => {
    if (cart.length === 0) return;

    const updates: Record<string, any> = {};

    cart.forEach((item) => {
      updates[`books/${item.barcode}/available`] = false;
    });

    await update(ref(db), updates);

    setPaymentComplete(true);
    setTimeout(() => {
      setCart([]);
      setPaymentComplete(false);
    }, 1500);
  };

  const handleClearCart = async () => {
    setCart([]);
    await set(ref(db, "scanner/searchBarcode"), "");
  };

  const handleRemoveItem = (barcode: string) => {
    setCart((prev) => prev.filter((item) => item.barcode !== barcode));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.book.price, 0);

  return (
    <div className="p-8 space-y-6 min-h-screen">
      <h1 className="text-4xl font-bold text-primary text-center">
        Cashier Mode
      </h1>

      {loading && <p className="text-blue-500 text-center">Loading book...</p>}

      {cart.length === 0 && (
        <p className="text-center text-gray-500 italic">
          Scan books to add to cart
        </p>
      )}

      <div className="grid gap-4 max-w-5xl mx-auto justify-center place-items-center [grid-template-columns:repeat(auto-fit,minmax(var(--container-3xs),max-content))]">
        {cart.map((item) => (
          <div key={item.barcode} className=" flex relative">
            <button
              onClick={() => handleRemoveItem(item.barcode)}
              className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold flex items-start cursor-pointer justify-center hover:bg-red-600 transition"
              title="Remove item"
            >
              <p>x</p>
            </button>

            <BookCard
              title={item.book.title}
              genre={item.book.genre}
              price={item.book.price}
              availability={item.book.available}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-xl font-semibold">
            Total: ₱{totalPrice.toLocaleString()}
          </h2>

          <ButtonConfirm onClick={handleConfirmPayment}>
            Confirm Payment
          </ButtonConfirm>

          <ButtonCancel onClick={handleClearCart}>Cancel All</ButtonCancel>
        </div>
      )}

      {paymentComplete && (
        <p className="text-green-600 font-bold text-center text-lg">
          Payment Successful!
        </p>
      )}
    </div>
  );
}
