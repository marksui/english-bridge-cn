import { BookOpen, Heart, Home } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  favoriteCount: number;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2 ${
    isActive ? "bg-skyline text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
  }`;

export default function Navbar({ favoriteCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-lg font-black text-ink focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2"
        >
          <BookOpen aria-hidden="true" className="h-6 w-6 text-leaf" />
          我的英文词库
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            <Home aria-hidden="true" className="h-4 w-4" />
            分类
          </NavLink>
          <NavLink to="/words" className={linkClass}>
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            词库
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            <Heart aria-hidden="true" className="h-4 w-4" />
            我的收藏
            <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs text-ink">
              {favoriteCount}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
