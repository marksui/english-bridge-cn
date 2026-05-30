import { useEffect, useState } from "react";

const PLACEHOLDER_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
  <rect width="640" height="480" rx="34" fill="#e8f5ef"/>
  <text x="320" y="226" text-anchor="middle" font-size="72" font-family="Arial, sans-serif">ABC</text>
  <text x="320" y="292" text-anchor="middle" font-size="34" font-weight="700" fill="#172033" font-family="Arial, sans-serif">Daily English</text>
</svg>`)}`;

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
