type BookAvailability = "Available" | "Unavailable";

interface AvailabilityBadgeProps {
  status: BookAvailability;
}

export default function BookCardBadge({ status }: AvailabilityBadgeProps) {
  return (
    <span
      className={`italic font-medium px-2 py-1 rounded-md text-sm
        ${
          status === "Available"
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100"
        }
      `}
    >
      {status}
    </span>
  );
}
