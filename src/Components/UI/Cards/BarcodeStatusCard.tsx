export default function BarcodeStatusCard({
  barcode,
  title = "Scanned Barcode:",
}: {
  barcode: string;
  title?: string;
}) {
  return (
    <div className="bg-card border border-secondary/40 p-4 rounded-lg w-full max-w-lg shadow">
      <h2 className="text-lg font-semibold text-textdark mb-2">{title}</h2>

      {barcode ? (
        <p className="text-green-600 font-bold">{barcode}</p>
      ) : (
        <p className="text-textmuted italic">Waiting for barcode...</p>
      )}
    </div>
  );
}
