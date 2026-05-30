import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-berry focus:ring-offset-2 ${
        isFavorite
          ? "border-berry bg-berry text-white hover:bg-pink-700"
          : "border-slate-200 bg-white text-slate-700 hover:border-berry hover:text-berry"
      }`}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "取消收藏" : "收藏单词"}
    >
      <Heart aria-hidden="true" className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      <span>{isFavorite ? "已收藏" : "收藏"}</span>
    </button>
  );
}
