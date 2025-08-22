import { useState, useEffect } from 'react';
import { Skeleton } from './skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function LazyImage({ src, alt, className, width, height }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground">Failed to load image</span>
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className={className} style={{ width, height }} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      style={{ width, height }}
      loading="lazy"
    />
  );
} 