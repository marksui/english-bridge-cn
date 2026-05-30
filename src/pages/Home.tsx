import { Heart, ListFilter } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { categories, totalWordCount } from "../data/vocabulary";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="grid gap-6 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-md bg-emerald-50 px-3 py-1 text-sm font-bold text-leaf">
            美式英语 · {categories.length} 个分类 · {totalWordCount} 个单词和短语
          </p>
          <h1 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">
            日常英文单词表
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            用图片和发音学习生活中的英文单词
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/words"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-skyline px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
          >
            <ListFilter aria-hidden="true" className="h-4 w-4" />
            查看全部单词
          </Link>
          <Link
            to="/favorites"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:border-berry hover:text-berry focus:outline-none focus:ring-2 focus:ring-berry focus:ring-offset-2"
          >
            <Heart aria-hidden="true" className="h-4 w-4" />
            我的收藏
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </main>
  );
}
