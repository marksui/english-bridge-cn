import { Volume2 } from "lucide-react";
import { speakEnglish } from "../utils/speech";

interface AudioButtonProps {
  text: string;
  label?: string;
  compact?: boolean;
  rate?: number;
  tone?: "normal" | "slow";
}

export default function AudioButton({
  text,
  label = "美式发音",
  compact = false,
  rate = 0.85,
  tone = "normal",
}: AudioButtonProps) {
  const isSlow = tone === "slow";

  return (
    <button
      type="button"
      onClick={() => speakEnglish(text, { rate })}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSlow
          ? "border-emerald-200 bg-emerald-50 text-leaf hover:border-emerald-300 hover:bg-emerald-100 focus:ring-leaf"
          : "border-skyline/20 bg-skyline text-white hover:bg-blue-700 focus:ring-skyline"
      } ${compact ? "px-3" : ""}`}
      aria-label={`${isSlow ? "慢速播放美式英语" : "播放美式英语"} ${text}`}
    >
      <Volume2 aria-hidden="true" className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
