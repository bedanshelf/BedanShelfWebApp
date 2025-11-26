interface BookCardProps {
  title?: string;
  image?: string;
  price?: number;
}

export default function BookCard({ title, image, price = 0 }: BookCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer border border-secondary/30">
      <img src={image} className="rounded-lg mb-4 h-48 w-full object-cover" />

      <h3 className="font-semibold text-lg text-textdark">{title}</h3>
      <p className="text-primary font-bold mt-2">₱{price.toFixed(2)}</p>

      <button className="mt-4 w-full bg-primary hover:bg-primary/80 text-white py-2 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}
