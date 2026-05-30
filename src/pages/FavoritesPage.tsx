import { ArrowLeft, Heart, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WordCard from "../components/WordCard";
import { categories, vocabulary } from "../data/vocabulary";
import { filterVocabularyItems } from "../utils/filter";

interface FavoritesPageProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export default function FavoritesPage({ favoriteIds, onToggleFavorite }: FavoritesPageProps) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const favoriteWords = useMemo(
    () => vocabulary.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds],
  );

  const filteredWords = useMemo(
    () => filterVocabularyItems(favoriteWords, query, categoryId),
    [favoriteWords, query, categoryId],
  );

  const resetFilters = () => {
    setQuery("");
    setCategoryId("all");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <section className="mb-6 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-ink shadow-sm transition hover:border-skyline hover:text-skyline focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            返回首页
          </Link>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-skyline px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            显示全部收藏
          </button>
        </div>

        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-pink-50 px-3 py-1 text-sm font-bold text-berry">
            <Heart aria-hidden="true" className="h-4 w-4 fill-current" />
            本地收藏
          </div>
          <h1 className="text-3xl font-black text-ink sm:text-4xl">我的收藏</h1>
          <p className="mt-2 text-slate-600">
            {filteredWords.length} / {favoriteWords.length} 个收藏
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_18rem]">
          <SearchBar value={query} onChange={setQuery} placeholder="搜索收藏单词" />
          <label className="block">
            <span className="sr-only">分类筛选</span>
            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-ink shadow-sm outline-none transition focus:border-skyline focus:ring-2 focus:ring-skyline/20"
            >
              <option value="all">全部分类</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryChinese} / {category.categoryEnglish}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {filteredWords.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredWords.map((item) => (
            <WordCard
              key={item.id}
              item={item}
              isFavorite
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </section>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          <p className="text-lg font-bold text-ink">还没有收藏的单词。</p>
          <Link
            to="/words"
            className="mt-5 inline-flex min-h-11 items-center rounded-md bg-skyline px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
          >
            去看全部单词
          </Link>
        </div>
      )}
    </main>
  );
}
