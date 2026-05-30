import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "搜索英文、中文或分类",
}: SearchBarProps) {
  return (
    <label className="relative block">
      <span className="sr-only">搜索</span>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-base text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-skyline focus:ring-2 focus:ring-skyline/20"
      />
    </label>
  );
}
