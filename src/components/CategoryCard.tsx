import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CategorySummary } from "../data/vocabulary";
import ImageWithFallback from "./ImageWithFallback";

interface CategoryCardProps {
  category: CategorySummary;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="h-44 w-full overflow-hidden bg-slate-100 sm:h-48">
        <ImageWithFallback src={category.imageUrl} alt={category.categoryChinese} />
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h2 className="text-xl font-bold text-ink">{category.categoryChinese}</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">{category.categoryEnglish}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-leaf">
            {category.wordCount} 个单词
          </span>
          <Link
            to={`/category/${category.id}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          >
            查看单词
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
