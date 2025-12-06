interface AvailabilityBadgeProps {
  status: boolean;
}

export default function BookCardBadge({ status }: AvailabilityBadgeProps) {
  return (
    <span
      className={`italic font-medium px-2 py-1 rounded-md text-sm
        ${status ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}
      `}
    >
      {status ? "Available" : "Unavailable"}
    </span>
  );
}
