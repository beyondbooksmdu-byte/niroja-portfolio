import { useState, type FormEvent } from 'react';
import { Plus, RotateCcw, Save, Trash2, X } from 'lucide-react';
import { DEFAULT_PORTFOLIO_DATA, type PortfolioData } from '../data/portfolioData';

interface PortfolioCustomizerModalProps {
  isOpen: boolean;
  data: PortfolioData;
  onClose: () => void;
  onSave: (updated: PortfolioData) => void;
  onReset: () => void;
}

export function PortfolioCustomizerModal({
  isOpen,
  data,
  onClose,
  onSave,
  onReset,
}: PortfolioCustomizerModalProps) {
  const [draft, setDraft] = useState<PortfolioData>(data);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_PORTFOLIO_DATA);
    onReset();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize Portfolio Details & Supabase Image URLs"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#252525]/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#EAE3D5] bg-[#FAFAF7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#EAE3D5] bg-white px-6 py-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#252525]">
              Portfolio Details &amp; Supabase Image URLs
            </h3>
            <p className="text-xs text-[#777777]">
              Update contact details, live project URL, or replace any Supabase public image URL.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customizer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] text-[#252525] hover:border-[#C5A253] hover:text-[#8F6B20]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto p-6">
          {/* Identity & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
              Identity &amp; Contact
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                  Name (Hero)
                </span>
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                  Email Address
                </span>
                <input
                  type="text"
                  value={draft.contact.email}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      contact: { ...draft.contact, email: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                  Contact Number
                </span>
                <input
                  type="text"
                  value={draft.contact.phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '');
                    setDraft({
                      ...draft,
                      contact: {
                        ...draft.contact,
                        phone: e.target.value,
                        whatsappNumber: digits.length === 10 ? `91${digits}` : digits,
                      },
                    });
                  }}
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                  BB Travels Live Project URL
                </span>
                <input
                  type="url"
                  placeholder="https://..."
                  value={draft.bbTravels.liveUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      bbTravels: { ...draft.bbTravels, liveUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                  Hero Short Introduction (approx. 2 lines)
                </span>
                <textarea
                  rows={2}
                  value={draft.heroIntro}
                  onChange={(e) => setDraft({ ...draft, heroIntro: e.target.value })}
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Supabase Image URLs */}
          <div className="space-y-4 border-t border-[#EAE3D5] pt-5">
            <h4 className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
              Supabase Public Image URLs
            </h4>
            <div className="grid gap-3.5">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#252525]">
                  profileImage
                </span>
                <input
                  type="text"
                  value={draft.profileImage}
                  onChange={(e) => setDraft({ ...draft, profileImage: e.target.value })}
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#252525]">
                  bbTravelsImage
                </span>
                <input
                  type="text"
                  value={draft.bbTravels.screenshotUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      bbTravels: { ...draft.bbTravels, screenshotUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#252525]">
                    marketResearchImage
                  </span>
                  <input
                    type="text"
                    value={draft.marketResearch.imageUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        marketResearch: { ...draft.marketResearch, imageUrl: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#252525]">
                    uspImage
                  </span>
                  <input
                    type="text"
                    value={draft.usp.imageUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        usp: { ...draft.usp, imageUrl: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#252525]">
                    frontendSitemapImage
                  </span>
                  <input
                    type="text"
                    value={draft.sitemaps.frontendUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        sitemaps: { ...draft.sitemaps, frontendUrl: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-[#252525]">
                    backendSitemapImage
                  </span>
                  <input
                    type="text"
                    value={draft.sitemaps.backendUrl}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        sitemaps: { ...draft.sitemaps, backendUrl: e.target.value },
                      })
                    }
                    className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                </label>
              </div>

              <div className="space-y-3 rounded-xl border border-[#EAE3D5] bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#252525]">
                    Design Process Images ({draft.designProcess.items.length})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        designProcess: {
                          ...draft.designProcess,
                          items: [
                            ...draft.designProcess.items,
                            {
                              id: `process-${Date.now()}`,
                              stageLabel: `Stage 0${draft.designProcess.items.length + 1}`,
                              title: 'New Design Process Stage',
                              caption: '',
                              imageUrl: '',
                            },
                          ],
                        },
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-[#C5A253] bg-[#FAFAF7] px-2.5 py-1 text-xs font-medium text-[#252525] hover:bg-[#F5F1E8]"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#8F6B20]" />
                    <span>Add Stage</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draft.designProcess.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="space-y-2 rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#8F6B20] uppercase">
                          Stage {idx + 1}
                        </span>
                        {draft.designProcess.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                designProcess: {
                                  ...draft.designProcess,
                                  items: draft.designProcess.items.filter((i) => i.id !== item.id),
                                },
                              })
                            }
                            aria-label={`Remove ${item.title}`}
                            className="inline-flex items-center gap-1 text-xs text-[#777777] hover:text-[#252525]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Stage label (e.g. Stage 01 · Wireframe)"
                          value={item.stageLabel}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              designProcess: {
                                ...draft.designProcess,
                                items: draft.designProcess.items.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, stageLabel: e.target.value }
                                    : entry
                                ),
                              },
                            })
                          }
                          className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={item.title}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              designProcess: {
                                ...draft.designProcess,
                                items: draft.designProcess.items.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, title: e.target.value }
                                    : entry
                                ),
                              },
                            })
                          }
                          className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Supabase public image URL"
                        value={item.imageUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            designProcess: {
                              ...draft.designProcess,
                              items: draft.designProcess.items.map((entry) =>
                                entry.id === item.id
                                  ? { ...entry, imageUrl: e.target.value }
                                  : entry
                              ),
                            },
                          })
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Short caption"
                        value={item.caption}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            designProcess: {
                              ...draft.designProcess,
                              items: draft.designProcess.items.map((entry) =>
                                entry.id === item.id
                                  ? { ...entry, caption: e.target.value }
                                  : entry
                              ),
                            },
                          })
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-[#EAE3D5] bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#252525]">
                    Paper Sketch Images ({draft.paperSketchImages.length})
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        paperSketchImages: [
                          ...draft.paperSketchImages,
                          {
                            id: `sketch-${Date.now()}`,
                            title: 'Additional Paper Sketch',
                            category: 'Original Hand-Drawn Sketch',
                            caption: '',
                            imageUrl: '',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-[#C5A253] bg-[#FAFAF7] px-2.5 py-1 text-xs font-medium text-[#252525] hover:bg-[#F5F1E8]"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#8F6B20]" />
                    <span>Add Sketch</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draft.paperSketchImages.map((sketch, idx) => (
                    <div
                      key={sketch.id}
                      className="space-y-2 rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-[#8F6B20] uppercase">
                          Sketch {idx + 1}
                        </span>
                        {draft.paperSketchImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                paperSketchImages: draft.paperSketchImages.filter(
                                  (s) => s.id !== sketch.id
                                ),
                              })
                            }
                            aria-label={`Remove ${sketch.title}`}
                            className="inline-flex items-center gap-1 text-xs text-[#777777] hover:text-[#252525]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          type="text"
                          placeholder="Category"
                          value={sketch.category}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              paperSketchImages: draft.paperSketchImages.map((entry) =>
                                entry.id === sketch.id
                                  ? { ...entry, category: e.target.value }
                                  : entry
                              ),
                            })
                          }
                          className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={sketch.title}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              paperSketchImages: draft.paperSketchImages.map((entry) =>
                                entry.id === sketch.id
                                  ? { ...entry, title: e.target.value }
                                  : entry
                              ),
                            })
                          }
                          className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Supabase public image URL"
                        value={sketch.imageUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            paperSketchImages: draft.paperSketchImages.map((entry) =>
                              entry.id === sketch.id
                                ? { ...entry, imageUrl: e.target.value }
                                : entry
                            ),
                          })
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Short caption"
                        value={sketch.caption}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            paperSketchImages: draft.paperSketchImages.map((entry) =>
                              entry.id === sketch.id
                                ? { ...entry, caption: e.target.value }
                                : entry
                            ),
                          })
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-[#252525]">
                  seoImage (Coming Soon Placeholder Image)
                </span>
                <input
                  type="text"
                  placeholder="https://..."
                  value={draft.seo.sharedImageUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    setDraft({
                      ...draft,
                      seo: {
                        sharedImageUrl: url,
                        pillars: draft.seo.pillars.map((p) => ({ ...p, imageUrl: url })),
                      },
                    });
                  }}
                  className="w-full rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EAE3D5] pt-5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-[#EAE3D5] bg-white px-4 py-2 text-xs font-medium text-[#777777] transition-colors hover:border-[#C5A253] hover:text-[#252525]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#EAE3D5] bg-white px-4 py-2 text-xs font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#252525] px-5 py-2 text-xs font-medium text-[#FAFAF7] transition-colors hover:bg-[#8F6B20]"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
