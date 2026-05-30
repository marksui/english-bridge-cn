import { useEffect, useRef, useState } from "react";

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

const WIKI_PREFIX = "wiki-photo:";
const DIRECT_PREFIX = "direct-photo:";
const WIKI_SEPARATOR = "|||";

function parseImageSource(src: string) {
  const isWikiSource = src.startsWith(WIKI_PREFIX);
  const isDirectSource = src.startsWith(DIRECT_PREFIX);

  if (!isWikiSource && !isDirectSource) {
    return null;
  }

  const payload = src.slice(isWikiSource ? WIKI_PREFIX.length : DIRECT_PREFIX.length);
  const separatorIndex = payload.indexOf(WIKI_SEPARATOR);

  if (separatorIndex < 0) {
    return null;
  }

  return {
    fallbackSrc: payload.slice(separatorIndex + WIKI_SEPARATOR.length),
    source: decodeURIComponent(payload.slice(0, separatorIndex)),
    type: isWikiSource ? "wiki" : "direct",
  };
}

export default function ImageWithFallback({ src, alt, className = "" }: ImageWithFallbackProps) {
  const parsedSource = parseImageSource(src);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoadPhoto, setShouldLoadPhoto] = useState(!parsedSource);
  const [imageSrc, setImageSrc] = useState(parsedSource?.fallbackSrc ?? src);

  useEffect(() => {
    const nextSource = parseImageSource(src);
    setImageSrc(nextSource?.fallbackSrc ?? src);
    setShouldLoadPhoto(!nextSource);
  }, [src]);

  useEffect(() => {
    const nextSource = parseImageSource(src);

    if (!nextSource) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoadPhoto(true);
      return;
    }

    const node = imageRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadPhoto(true);
          observer.disconnect();
        }
      },
      { rootMargin: "260px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    const nextSource = parseImageSource(src);

    if (!nextSource || !shouldLoadPhoto) {
      return;
    }

    if (nextSource.type === "direct") {
      setImageSrc(nextSource.source);
      return;
    }

    const controller = new AbortController();
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      nextSource.source,
    )}`;
    fetch(summaryUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Wikipedia image lookup failed: ${response.status}`);
        }
        return response.json() as Promise<{
          originalimage?: { source?: string };
          thumbnail?: { source?: string };
        }>;
      })
      .then((data) => {
        const photoUrl = data.thumbnail?.source ?? data.originalimage?.source;
        setImageSrc(photoUrl ?? nextSource.fallbackSrc);
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setImageSrc(nextSource.fallbackSrc);
        }
      });

    return () => controller.abort();
  }, [shouldLoadPhoto, src]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`block h-full w-full object-cover object-center ${className}`}
      loading="lazy"
      onError={() => setImageSrc(parsedSource?.fallbackSrc ?? PLACEHOLDER_IMAGE)}
    />
  );
}
