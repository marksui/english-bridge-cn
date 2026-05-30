import { ArrowLeft, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WordCard from "../components/WordCard";
import { categories, vocabulary } from "../data/vocabulary";
import { filterVocabularyItems } from "../utils/filter";

interface AllWordsPageProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export default function AllWordsPage({ favoriteIds, onToggleFavorite }: AllWordsPageProps) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  const filteredWords = useMemo(
    () => filterVocabularyItems(vocabulary, query, categoryId),
    [query, categoryId],
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
            显示全部单词
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-black text-ink sm:text-4xl">全部单词</h1>
          <p className="mt-2 text-slate-600">
            {filteredWords.length} / {vocabulary.length} 个单词和短语
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_18rem]">
          <SearchBar value={query} onChange={setQuery} />
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
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </section>
      ) : (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
          没有找到匹配的单词。
        </p>
      )}
    </main>
  );
}
