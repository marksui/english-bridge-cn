import { useEffect, useState } from "react";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/640x480/e8f5ef/172033?text=Daily+English";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithFallback({ src, alt, className = "" }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
      onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
    />
  );
}
