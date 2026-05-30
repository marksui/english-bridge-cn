import type { VocabularyItem } from "../data/vocabulary";
import AudioButton from "./AudioButton";
import FavoriteButton from "./FavoriteButton";
import ImageWithFallback from "./ImageWithFallback";

interface WordCardProps {
  item: VocabularyItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function WordCard({ item, isFavorite, onToggleFavorite }: WordCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-slate-100">
        <ImageWithFallback src={item.imageUrl} alt={item.word} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber">
              {item.categoryChinese}
            </span>
            <span className="text-xs font-medium text-slate-400">{item.categoryEnglish}</span>
          </div>
          <h3 className="break-words text-2xl font-black leading-tight text-ink">{item.word}</h3>
          <p className="text-lg font-semibold text-leaf">{item.chinese}</p>
          <p className="text-sm text-slate-500">美式发音提示：{item.pronunciationHint}</p>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-sm font-semibold leading-6 text-slate-800">{item.example}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{item.exampleChinese}</p>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
          <AudioButton text={item.word} />
          <AudioButton text={item.word} label="慢速" rate={0.58} tone="slow" />
          <AudioButton text={item.example} label="美式例句" compact />
          <FavoriteButton isFavorite={isFavorite} onToggle={() => onToggleFavorite(item.id)} />
        </div>
      </div>
    </article>
  );
}
