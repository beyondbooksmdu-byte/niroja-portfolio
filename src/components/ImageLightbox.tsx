import { useEffect } from 'react';
import { X } from 'lucide-react';

export interface LightboxItem {
  src: string;
  title: string;
  caption?: string;
}

interface ImageLightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#252525]/80 p-4 backdrop-blur-xs sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[#EAE3D5] bg-[#FAFAF7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#EAE3D5] bg-white px-5 py-4">
          <div className="min-w-0">
            <h3 className="truncate font-display text-2xl font-semibold text-[#252525]">
              {item.title}
            </h3>
            {item.caption && (
              <p className="mt-0.5 truncate text-sm text-[#6E6E6E]">{item.caption}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] text-[#252525] transition-colors hover:border-[#C5A253] hover:text-[#8F6B20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A253]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex max-h-[calc(90vh-84px)] items-center justify-center overflow-auto bg-[#F5F1E8] p-4 sm:p-6">
          <img
            src={item.src}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] w-auto rounded-lg border border-[#EAE3D5] bg-white object-contain shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
