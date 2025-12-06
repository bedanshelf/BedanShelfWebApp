interface GenreTagsProps {
  genres: string[];
  removable?: boolean; // if true, shows 'x' for removal
  onRemove?: (genre: string) => void;
}

export default function GenreTags({
  genres,
  removable = false,
  onRemove,
}: GenreTagsProps) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre}
          className="bg-primary/20 text-primary text-xs italic px-2 py-1 rounded-full flex items-center gap-1"
        >
          {genre}
          {removable && onRemove && (
            <button
              type="button"
              className="font-bold text-sm hover:text-red-600"
              onClick={() => onRemove(genre)}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
