import { ArrowLeft, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WordCard from "../components/WordCard";
import { getCategoryById, getWordsByCategory } from "../data/vocabulary";
import { filterVocabularyItems } from "../utils/filter";

interface CategoryPageProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export default function CategoryPage({ favoriteIds, onToggleFavorite }: CategoryPageProps) {
  const { categoryId = "" } = useParams();
  const category = getCategoryById(categoryId);
  const [query, setQuery] = useState("");

  const words = useMemo(() => getWordsByCategory(categoryId), [categoryId]);
  const filteredWords = useMemo(() => filterVocabularyItems(words, query), [words, query]);

  if (!category) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-black text-ink">没有找到这个分类</h1>
          <Link
            to="/"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-white"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            返回首页
          </Link>
        </div>
      </main>
    );
  }

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
          <Link
            to="/words"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-skyline px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            显示全部单词
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_24rem] lg:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-normal text-leaf">
              {category.categoryEnglish}
            </p>
            <h1 className="text-3xl font-black text-ink sm:text-4xl">
              {category.categoryChinese}
            </h1>
            <p className="mt-2 text-slate-600">
              {filteredWords.length} / {category.wordCount} 个单词
            </p>
          </div>
          <SearchBar value={query} onChange={setQuery} placeholder="在本分类中搜索" />
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
