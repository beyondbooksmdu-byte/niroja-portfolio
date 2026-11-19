import { useEffect, useState } from 'react';
import { Expand, Image as ImageIcon } from 'lucide-react';

interface PortfolioImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  preserveAspect?: boolean;
  onPreview?: (src: string, title: string, caption?: string) => void;
  previewTitle?: string;
  previewCaption?: string;
  className?: string;
  roundedClass?: string;
}

export function PortfolioImage({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  preserveAspect = false,
  onPreview,
  previewTitle,
  previewCaption,
  className = '',
  roundedClass = 'rounded-xl',
}: PortfolioImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const isClickable = Boolean(onPreview && !hasError && src);

  return (
    <div
      className={`group relative overflow-hidden bg-white border border-[#EAE3D5] shadow-[0_8px_30px_rgb(37,37,37,0.04)] ${roundedClass} ${
        preserveAspect ? 'w-full' : aspectClass
      } ${className}`}
    >
      {!hasError && src ? (
        preserveAspect ? (
          <div className="flex w-full items-center justify-center bg-[#FAFAF7] p-1.5 sm:p-2">
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() => setHasError(true)}
              className={`block h-auto max-h-[880px] w-full rounded-lg object-contain transition-transform duration-300 ease-out ${
                isClickable ? 'group-hover:scale-[1.01]' : ''
              }`}
            />
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`h-full w-full object-cover transition-transform duration-300 ease-out ${
              isClickable ? 'group-hover:scale-[1.02]' : ''
            }`}
          />
        )
      ) : (
        <div
          className={`flex w-full flex-col items-center justify-center bg-[#F5F1E8] p-6 text-center ${
            preserveAspect ? 'min-h-[260px]' : 'h-full'
          }`}
        >
          <ImageIcon className="mb-3 h-7 w-7 text-[#C5A253]" strokeWidth={1.5} />
          <p className="font-display text-lg font-semibold text-[#252525]">{previewTitle || alt}</p>
          <p className="mt-1 text-xs text-[#777777]">
            {src ? 'Image preview unavailable' : 'Image placeholder ready for Supabase URL'}
          </p>
        </div>
      )}

      {isClickable && (
        <button
          type="button"
          onClick={() => onPreview?.(src, previewTitle || alt, previewCaption)}
          aria-label={`Preview ${previewTitle || alt}`}
          className="absolute inset-0 flex items-end justify-end bg-[#252525]/0 p-3 opacity-0 transition-opacity duration-200 hover:bg-[#252525]/5 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A253]"
        >
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white/95 px-3 py-1.5 text-xs font-medium text-[#252525] shadow-sm">
            <Expand className="h-3.5 w-3.5 text-[#8F6B20]" />
            <span>Preview Full Size</span>
          </span>
        </button>
      )}
    </div>
  );
}
