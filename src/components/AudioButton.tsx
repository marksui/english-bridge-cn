import { Volume2 } from "lucide-react";
import { speakEnglish } from "../utils/speech";

interface AudioButtonProps {
  text: string;
  label?: string;
  compact?: boolean;
}

export default function AudioButton({
  text,
  label = "美式发音",
  compact = false,
}: AudioButtonProps) {
  return (
    <button
      type="button"
      onClick={() => speakEnglish(text)}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-skyline/20 bg-skyline px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-skyline focus:ring-offset-2 ${
        compact ? "px-3" : ""
      }`}
      aria-label={`播放美式英语 ${text}`}
    >
      <Volume2 aria-hidden="true" className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
