import { useEffect, useState } from 'react';
import {
  ArrowDown,
  Check,
  Edit3,
  ExternalLink,
  Globe,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { DEFAULT_PORTFOLIO_DATA, type PortfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { PortfolioImage } from './components/PortfolioImage';
import { ImageLightbox, type LightboxItem } from './components/ImageLightbox';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';

const STORAGE_KEY = 'niroja_dm_portfolio_v3';

function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_DATA;
    const parsed = JSON.parse(raw) as Partial<PortfolioData> & {
      designProcess?: Partial<PortfolioData['designProcess']> & {
        paperSketchUrl?: string;
        finalWebsiteUrl?: string;
      };
    };

    const rawDesignItems =
      Array.isArray(parsed.designProcess?.items) && parsed.designProcess.items.length > 0
        ? parsed.designProcess.items
        : DEFAULT_PORTFOLIO_DATA.designProcess.items.map((item, idx) => {
            if (idx === 0 && parsed.designProcess?.paperSketchUrl) {
              return { ...item, imageUrl: parsed.designProcess.paperSketchUrl };
            }
            if (idx === 1 && parsed.designProcess?.finalWebsiteUrl) {
              return { ...item, imageUrl: parsed.designProcess.finalWebsiteUrl };
            }
            return item;
          });

    const migratedDesignItems = rawDesignItems.map((item) =>
      item.id === 'process-paper-sketch' && item.title === 'Original Paper Sketch'
        ? { ...item, title: 'Wireframe' }
        : item
    );

    return {
      ...DEFAULT_PORTFOLIO_DATA,
      ...parsed,
      fullName:
        !parsed.fullName || parsed.fullName === 'Niroja M'
          ? DEFAULT_PORTFOLIO_DATA.fullName
          : parsed.fullName,
      heroIntro: parsed.heroIntro || DEFAULT_PORTFOLIO_DATA.heroIntro,
      about: {
        ...DEFAULT_PORTFOLIO_DATA.about,
        ...(parsed.about || {}),
      },
      bbTravels: {
        ...DEFAULT_PORTFOLIO_DATA.bbTravels,
        ...(parsed.bbTravels || {}),
      },
      marketResearch: {
        ...DEFAULT_PORTFOLIO_DATA.marketResearch,
        ...(parsed.marketResearch || {}),
      },
      usp: {
        ...DEFAULT_PORTFOLIO_DATA.usp,
        ...(parsed.usp || {}),
      },
      sitemaps: {
        ...DEFAULT_PORTFOLIO_DATA.sitemaps,
        ...(parsed.sitemaps || {}),
      },
      designProcess: {
        items: migratedDesignItems,
        additionalGalleryImages:
          parsed.designProcess?.additionalGalleryImages ||
          DEFAULT_PORTFOLIO_DATA.designProcess.additionalGalleryImages,
      },
      paperSketchImages: Array.isArray(parsed.paperSketchImages)
        ? parsed.paperSketchImages
        : DEFAULT_PORTFOLIO_DATA.paperSketchImages,
      seo: {
        ...DEFAULT_PORTFOLIO_DATA.seo,
        ...(parsed.seo || {}),
      },
      contact: {
        ...DEFAULT_PORTFOLIO_DATA.contact,
        ...(parsed.contact || {}),
      },
    };
  } catch {
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export default function App() {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);
  const [showMoreGallery, setShowMoreGallery] = useState(false);

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingResearch, setIsEditingResearch] = useState(false);
  const [isEditingUsp, setIsEditingUsp] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailDraft, setEmailDraft] = useState(data.contact.email);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [socialDraftUrl, setSocialDraftUrl] = useState('');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [data]);

  const openPreview = (src: string, title: string, caption?: string) => {
    setLightboxItem({ src, title, caption });
  };

  const handleSaveEmail = () => {
    const trimmed = emailDraft.trim() || '[YOUR EMAIL ADDRESS]';
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, email: trimmed },
    }));
    setEmailDraft(trimmed);
    setIsEditingEmail(false);
  };

  const handleSaveSocial = (id: string) => {
    setData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: prev.contact.socialLinks.map((item) =>
          item.id === id ? { ...item, url: socialDraftUrl.trim() } : item
        ),
      },
    }));
    setEditingSocialId(null);
    setSocialDraftUrl('');
  };

  const hasValidEmail =
    data.contact.email.includes('@') && data.contact.email !== '[YOUR EMAIL ADDRESS]';

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#252525]">
      <Navbar brandName={data.fullName} />

      <main>
        {/* 1. HERO SECTION — Compact Top Spacing, Name "Niroja M.", 2-Line Introduction + Profile Photo */}
        <section
          id="hero"
          className="relative overflow-hidden bg-[#FAFAF7] py-10 sm:py-14 lg:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none mx-auto max-w-7xl px-4 sm:px-6 lg:px-10"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-[#C5A253]/50 via-[#EAE3D5] to-transparent" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-10">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <div aria-hidden="true" className="mb-5 h-[1.5px] w-16 bg-[#C5A253]" />
                <h1 className="font-display text-balance text-5xl font-semibold tracking-tight text-[#252525] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.06]">
                  {data.fullName}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#777777] sm:text-[1.0625rem]">
                  {data.heroIntro}
                </p>
                <div aria-hidden="true" className="mt-6 h-[1px] w-28 bg-[#C5A253]/45" />
              </div>

              <div className="flex justify-center lg:col-span-5 lg:justify-end">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 -right-3 h-full w-full rounded-2xl border border-[#C5A253]/50"
                  />
                  <PortfolioImage
                    src={data.profileImage}
                    alt={data.fullName}
                    aspectClass="aspect-square"
                    onPreview={openPreview}
                    previewTitle={data.fullName}
                    roundedClass="rounded-2xl"
                    className="relative p-2.5 shadow-[0_14px_40px_rgb(37,37,37,0.06)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME */}
        <section id="about" className="border-t border-[#EAE3D5] bg-[#F5F1E8] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  About Me
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Digital Marketing Interests &amp; Learning Journey
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {isEditingAbout && (
                  <button
                    type="button"
                    onClick={() =>
                      setData((prev) => ({ ...prev, about: DEFAULT_PORTFOLIO_DATA.about }))
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs font-medium text-[#777777] transition-colors hover:border-[#C5A253] hover:text-[#252525]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingAbout((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                    isEditingAbout
                      ? 'border-[#8F6B20] bg-[#252525] text-[#FAFAF7]'
                      : 'border-[#EAE3D5] bg-white text-[#252525] hover:border-[#C5A253]'
                  }`}
                >
                  {isEditingAbout ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Done Editing</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3.5 w-3.5 text-[#8F6B20]" />
                      <span>Edit About</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <PortfolioImage
                  src={data.profileImage}
                  alt={data.fullName}
                  aspectClass="aspect-square"
                  onPreview={openPreview}
                  previewTitle={data.fullName}
                  roundedClass="rounded-2xl"
                  className="h-full p-3"
                />
              </div>

              <div className="flex flex-col justify-between gap-6 lg:col-span-7">
                {isEditingAbout ? (
                  <div className="space-y-4 rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-[#252525]">
                        Introduction
                      </span>
                      <textarea
                        rows={3}
                        value={data.about.introduction}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            about: { ...prev.about, introduction: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-[#252525]">
                        Digital Marketing Interests
                      </span>
                      <textarea
                        rows={3}
                        value={data.about.interests}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            about: { ...prev.about, interests: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold text-[#252525]">
                        Skills &amp; Learning Journey
                      </span>
                      <textarea
                        rows={3}
                        value={data.about.learningJourney}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            about: { ...prev.about, learningJourney: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                      <h3 className="font-display text-2xl font-semibold text-[#252525]">
                        Introduction
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#777777]">
                        {data.about.introduction}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                      <h3 className="font-display text-2xl font-semibold text-[#252525]">
                        Digital Marketing Interests &amp; Skills
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#777777]">
                        {data.about.interests}
                      </p>
                      <p className="mt-4 border-t border-[#EAE3D5] pt-4 text-sm leading-relaxed text-[#777777]">
                        {data.about.learningJourney}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROJECT – BB TRAVELS */}
        <section id="bb-travels" className="border-t border-[#EAE3D5] bg-[#FAFAF7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  Featured Project
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  {data.bbTravels.name}
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#777777]">
                  {data.bbTravels.type}
                </p>
              </div>

              {data.bbTravels.liveUrl ? (
                <a
                  href={data.bbTravels.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#252525] px-5 py-2.5 text-sm font-medium text-[#FAFAF7] transition-colors hover:bg-[#8F6B20]"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="h-4 w-4 text-[#C5A253]" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCustomizerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#252525] px-5 py-2.5 text-sm font-medium text-[#FAFAF7] transition-colors hover:bg-[#8F6B20]"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="h-4 w-4 text-[#C5A253]" />
                </button>
              )}
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <PortfolioImage
                  src={data.bbTravels.screenshotUrl}
                  alt="BB Travels website screenshot"
                  preserveAspect
                  onPreview={openPreview}
                  previewTitle="BB Travels — Travel & Bus Ticket Booking Website"
                  previewCaption={data.bbTravels.overview}
                  roundedClass="rounded-2xl"
                />
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8 lg:col-span-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#252525]">
                    Project Overview
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#777777]">
                    {data.bbTravels.overview}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#EAE3D5] pt-6">
                  <h4 className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                    Technologies &amp; Tools Used
                  </h4>
                  <p className="mt-2.5 text-sm leading-relaxed font-medium text-[#252525]">
                    {data.bbTravels.technologies.join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-[#252525]">
                  Project Objectives
                </h3>
                <ul className="mt-4 space-y-3">
                  {data.bbTravels.objectives.map((objective, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#777777]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5A253]" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-[#252525]">
                  Website Features
                </h3>
                <ul className="mt-4 space-y-3">
                  {data.bbTravels.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm leading-relaxed text-[#777777]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C5A253]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. MARKET RESEARCH & COMPETITOR ANALYSIS — ONE Complete Original Image Preserving Portrait Proportions */}
        <section id="research" className="border-t border-[#EAE3D5] bg-[#F5F1E8] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  Market Research &amp; Competitor Analysis
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Original Research Documentation
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {isEditingResearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        marketResearch: DEFAULT_PORTFOLIO_DATA.marketResearch,
                      }))
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs font-medium text-[#777777] transition-colors hover:border-[#C5A253] hover:text-[#252525]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingResearch((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                    isEditingResearch
                      ? 'border-[#8F6B20] bg-[#252525] text-[#FAFAF7]'
                      : 'border-[#EAE3D5] bg-white text-[#252525] hover:border-[#C5A253]'
                  }`}
                >
                  {isEditingResearch ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Done Editing</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3.5 w-3.5 text-[#8F6B20]" />
                      <span>Edit Description</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid items-center gap-8 rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <PortfolioImage
                  src={data.marketResearch.imageUrl}
                  alt={data.marketResearch.title}
                  preserveAspect
                  onPreview={openPreview}
                  previewTitle={data.marketResearch.title}
                  previewCaption={data.marketResearch.description}
                  roundedClass="rounded-xl"
                />
              </div>

              <div className="lg:col-span-4">
                {isEditingResearch ? (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                        Section Heading
                      </span>
                      <input
                        type="text"
                        value={data.marketResearch.title}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            marketResearch: { ...prev.marketResearch, title: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm font-semibold text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                        Short Description
                      </span>
                      <textarea
                        rows={5}
                        value={data.marketResearch.description}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            marketResearch: {
                              ...prev.marketResearch,
                              description: e.target.value,
                            },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm leading-relaxed text-[#777777] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                      Complete Research Document
                    </p>
                    <h3 className="font-display mt-2 text-3xl font-semibold text-[#252525]">
                      {data.marketResearch.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#777777]">
                      {data.marketResearch.description}
                    </p>
                    <p className="mt-5 text-xs text-[#777777]">
                      Click the image to view full size.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 5. USP – UNIQUE SELLING PROPOSITION — ONE Complete Image Preserving Proportions */}
        <section id="usp" className="border-t border-[#EAE3D5] bg-[#FAFAF7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  USP – Unique Selling Proposition
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Core Value Positioning
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {isEditingUsp && (
                  <button
                    type="button"
                    onClick={() =>
                      setData((prev) => ({ ...prev, usp: DEFAULT_PORTFOLIO_DATA.usp }))
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs font-medium text-[#777777] transition-colors hover:border-[#C5A253] hover:text-[#252525]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingUsp((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-medium transition-colors ${
                    isEditingUsp
                      ? 'border-[#8F6B20] bg-[#252525] text-[#FAFAF7]'
                      : 'border-[#EAE3D5] bg-white text-[#252525] hover:border-[#C5A253]'
                  }`}
                >
                  {isEditingUsp ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Done Editing</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3.5 w-3.5 text-[#8F6B20]" />
                      <span>Edit USP</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid items-center gap-8 rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <PortfolioImage
                  src={data.usp.imageUrl}
                  alt={data.usp.title}
                  preserveAspect
                  onPreview={openPreview}
                  previewTitle={data.usp.title}
                  previewCaption={data.usp.explanation}
                  roundedClass="rounded-xl"
                />
              </div>

              <div className="lg:col-span-4">
                {isEditingUsp ? (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                        USP Heading
                      </span>
                      <input
                        type="text"
                        value={data.usp.title}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            usp: { ...prev.usp, title: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm font-semibold text-[#252525] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium text-[#252525]">
                        Short Explanation
                      </span>
                      <textarea
                        rows={5}
                        value={data.usp.explanation}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            usp: { ...prev.usp, explanation: e.target.value },
                          }))
                        }
                        className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm leading-relaxed text-[#777777] focus:border-[#C5A253] focus:outline-none"
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                      Complete USP Research
                    </p>
                    <h3 className="font-display mt-2 text-3xl font-semibold text-[#252525]">
                      {data.usp.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#777777]">
                      {data.usp.explanation}
                    </p>
                    <p className="mt-5 text-xs text-[#777777]">
                      Click the image to view full size.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. WEBSITE SITEMAP — Frontend & Backend Sitemap Images */}
        <section id="sitemap" className="border-t border-[#EAE3D5] bg-[#F5F1E8] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                Website Sitemap
              </h2>
              <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                BB Travels Frontend &amp; Backend Sitemaps
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-6">
                <h3 className="font-display mb-4 text-2xl font-semibold text-[#252525]">
                  {data.sitemaps.frontendTitle}
                </h3>
                <PortfolioImage
                  src={data.sitemaps.frontendUrl}
                  alt="BB Travels Website Frontend Sitemap"
                  preserveAspect
                  onPreview={openPreview}
                  previewTitle={data.sitemaps.frontendTitle}
                  previewCaption={data.sitemaps.frontendCaption}
                  roundedClass="rounded-xl"
                />
                <p className="mt-4 text-sm leading-relaxed text-[#777777]">
                  {data.sitemaps.frontendCaption}
                </p>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-6">
                <h3 className="font-display mb-4 text-2xl font-semibold text-[#252525]">
                  {data.sitemaps.backendTitle}
                </h3>
                <PortfolioImage
                  src={data.sitemaps.backendUrl}
                  alt="BB Travels Website Backend Sitemap"
                  preserveAspect
                  onPreview={openPreview}
                  previewTitle={data.sitemaps.backendTitle}
                  previewCaption={data.sitemaps.backendCaption}
                  roundedClass="rounded-xl"
                />
                <p className="mt-4 text-sm leading-relaxed text-[#777777]">
                  {data.sitemaps.backendCaption}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DESIGN PROCESS — Wireframe → Final Website Design */}
        <section id="wireframes" className="border-t border-[#EAE3D5] bg-[#FAFAF7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  Design Process
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Wireframe &rarr; Final Website Design
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white px-4 py-2 text-xs font-medium text-[#252525] transition-colors hover:border-[#C5A253]"
              >
                <Edit3 className="h-3.5 w-3.5 text-[#8F6B20]" />
                <span>Manage Process Images</span>
              </button>
            </div>

            {/* Flexible Sequential Project-Process Showcase */}
            <div className="mx-auto max-w-6xl space-y-6">
              {data.designProcess.items.map((item, idx) => (
                <div key={item.id}>
                  <article className="rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-2xl font-semibold text-[#252525]">
                        {item.title}
                      </h3>
                      {item.stageLabel && (
                        <span className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                          {item.stageLabel}
                        </span>
                      )}
                    </div>
                    <PortfolioImage
                      src={item.imageUrl}
                      alt={item.title}
                      preserveAspect
                      onPreview={openPreview}
                      previewTitle={item.title}
                      previewCaption={item.caption}
                      roundedClass="rounded-xl"
                    />
                    {item.caption && (
                      <p className="mt-4 text-sm leading-relaxed text-[#777777]">
                        {item.caption}
                      </p>
                    )}
                  </article>

                  {idx < data.designProcess.items.length - 1 && (
                    <div className="flex flex-col items-center justify-center pt-6" aria-hidden="true">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A253]/60 bg-white shadow-xs">
                        <ArrowDown className="h-5 w-5 text-[#8F6B20]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Design Gallery */}
            {showMoreGallery && data.designProcess.additionalGalleryImages.length > 0 && (
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {data.designProcess.additionalGalleryImages.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-6"
                  >
                    <PortfolioImage
                      src={item.imageUrl}
                      alt={item.title}
                      preserveAspect
                      onPreview={openPreview}
                      previewTitle={item.title}
                      previewCaption={item.caption}
                      roundedClass="rounded-xl"
                    />
                    <div className="mt-5">
                      <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                        {item.category}
                      </p>
                      <h4 className="font-display mt-1.5 text-2xl font-semibold text-[#252525]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#777777]">
                        {item.caption}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {data.designProcess.additionalGalleryImages.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowMoreGallery((prev) => !prev)}
                  className="rounded-lg border border-[#C5A253] bg-white px-6 py-2.5 text-sm font-medium text-[#252525] transition-colors hover:bg-[#252525] hover:text-[#FAFAF7]"
                >
                  {showMoreGallery ? 'Show Less' : 'View More'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 8. PAPER SKETCH — Separate Section for Original Hand-Drawn Sketches */}
        <section id="paper-sketch" className="border-t border-[#EAE3D5] bg-[#FAFAF7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  Paper Sketch
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Original Hand-Drawn Sketches
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#EAE3D5] bg-white px-4 py-2 text-xs font-medium text-[#252525] transition-colors hover:border-[#C5A253]"
              >
                <Edit3 className="h-3.5 w-3.5 text-[#8F6B20]" />
                <span>Manage Paper Sketches</span>
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {data.paperSketchImages.map((sketch) => (
                <article
                  key={sketch.id}
                  className="rounded-2xl border border-[#EAE3D5] bg-white p-5 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-6"
                >
                  <PortfolioImage
                    src={sketch.imageUrl}
                    alt={sketch.title}
                    preserveAspect
                    onPreview={sketch.imageUrl ? openPreview : undefined}
                    previewTitle={sketch.title}
                    previewCaption={sketch.caption}
                    roundedClass="rounded-xl"
                  />
                  <div className="mt-5">
                    {sketch.category && (
                      <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                        {sketch.category}
                      </p>
                    )}
                    <h3 className="font-display mt-1.5 text-2xl font-semibold text-[#252525]">
                      {sketch.title}
                    </h3>
                    {sketch.caption && (
                      <p className="mt-2 text-sm leading-relaxed text-[#777777]">
                        {sketch.caption}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9. SEO PROFILE – COMING SOON */}
        <section id="seo" className="border-t border-[#EAE3D5] bg-[#F5F1E8] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                  SEO Profile
                </h2>
                <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                  Search Engine Optimization — Coming Soon
                </p>
              </div>
              <span className="font-display text-xl font-semibold italic text-[#8F6B20]">
                Coming Soon
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.seo.pillars.map((pillar, index) => (
                <div
                  key={pillar.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#EAE3D5] bg-white p-6 shadow-[0_8px_30px_rgb(37,37,37,0.04)]"
                >
                  <div>
                    <PortfolioImage
                      src={pillar.imageUrl}
                      alt={`${pillar.title} placeholder`}
                      aspectClass="aspect-[16/10]"
                      onPreview={pillar.imageUrl ? openPreview : undefined}
                      previewTitle={pillar.title}
                      previewCaption="Coming Soon"
                      roundedClass="rounded-xl"
                      className="mb-5"
                    />
                    <div className="flex items-center justify-between text-xs font-medium text-[#8F6B20]">
                      <span className="tabular-nums">0{index + 1}</span>
                      <span>Coming Soon</span>
                    </div>
                    <h3 className="font-display mt-3 text-2xl font-semibold text-[#252525]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#777777]">
                      {pillar.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CONTACT SECTION */}
        <section id="contact" className="border-t border-[#EAE3D5] bg-[#FAFAF7] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-sm font-semibold tracking-widest text-[#8F6B20] uppercase">
                Contact
              </h2>
              <p className="font-display mt-3 text-balance text-3xl font-semibold tracking-tight text-[#252525] sm:text-4xl">
                Direct Enquiries &amp; Connections
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8 lg:col-span-6">
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAE3D5] pb-6">
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                        Contact Number
                      </p>
                      <p className="mt-1.5 text-xl font-semibold tracking-tight text-[#252525] tabular-nums">
                        {data.contact.phone}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={`tel:${data.contact.phone}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#252525] px-4 py-2.5 text-sm font-medium text-[#FAFAF7] transition-colors hover:bg-[#8F6B20]"
                      >
                        <Phone className="h-4 w-4 text-[#C5A253]" />
                        <span>Call Me</span>
                      </a>
                      <a
                        href={`https://wa.me/${data.contact.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#C5A253] bg-white px-4 py-2.5 text-sm font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8]"
                      >
                        <MessageCircle className="h-4 w-4 text-[#8F6B20]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                        Email
                      </p>
                      {!isEditingEmail && (
                        <button
                          type="button"
                          onClick={() => {
                            setEmailDraft(data.contact.email);
                            setIsEditingEmail(true);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#777777] transition-colors hover:text-[#8F6B20]"
                        >
                          <Pencil className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>

                    {isEditingEmail ? (
                      <div className="mt-2.5 flex items-center gap-2">
                        <input
                          type="text"
                          value={emailDraft}
                          onChange={(e) => setEmailDraft(e.target.value)}
                          aria-label="Edit email address"
                          className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3.5 py-2 text-sm text-[#252525] focus:border-[#C5A253] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleSaveEmail}
                          className="shrink-0 rounded-lg bg-[#252525] px-4 py-2 text-xs font-medium text-[#FAFAF7] hover:bg-[#8F6B20]"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center gap-2.5">
                        <Mail className="h-4 w-4 shrink-0 text-[#8F6B20]" />
                        {hasValidEmail ? (
                          <a
                            href={`mailto:${data.contact.email}`}
                            className="text-base font-medium text-[#252525] underline decoration-[#C5A253]/60 underline-offset-4 hover:text-[#8F6B20]"
                          >
                            {data.contact.email}
                          </a>
                        ) : (
                          <span className="text-base font-medium text-[#252525]">
                            {data.contact.email}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#EAE3D5] bg-white p-7 shadow-[0_8px_30px_rgb(37,37,37,0.04)] sm:p-8 lg:col-span-6">
                <p className="text-xs font-semibold tracking-wider text-[#8F6B20] uppercase">
                  Social Profiles
                </p>
                <p className="mt-1.5 text-sm text-[#777777]">
                  Add your LinkedIn and Instagram URLs when ready.
                </p>

                <div className="mt-6 divide-y divide-[#EAE3D5]">
                  {data.contact.socialLinks.map((social) => {
                    const isEditingThis = editingSocialId === social.id;
                    return (
                      <div key={social.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-[#252525]">
                              {social.platform}
                            </p>
                            {!isEditingThis && (
                              <p className="mt-0.5 truncate text-xs text-[#777777]">
                                {social.url ? social.url : social.placeholder}
                              </p>
                            )}
                          </div>

                          {!isEditingThis && (
                            <div className="flex items-center gap-2 shrink-0">
                              {social.url && (
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Open ${social.platform}`}
                                  className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3 text-xs font-medium text-[#252525] hover:border-[#C5A253] hover:text-[#8F6B20]"
                                >
                                  <Globe className="h-3.5 w-3.5" />
                                  <span>Visit</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSocialId(social.id);
                                  setSocialDraftUrl(social.url);
                                }}
                                className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#EAE3D5] bg-white px-3 text-xs font-medium text-[#777777] hover:border-[#C5A253] hover:text-[#252525]"
                              >
                                <Pencil className="h-3 w-3" />
                                <span>{social.url ? 'Edit' : 'Set URL'}</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {isEditingThis && (
                          <div className="mt-2.5 flex items-center gap-2">
                            <input
                              type="url"
                              placeholder="https://..."
                              value={socialDraftUrl}
                              onChange={(e) => setSocialDraftUrl(e.target.value)}
                              aria-label={`${social.platform} URL`}
                              className="w-full rounded-lg border border-[#EAE3D5] bg-[#FAFAF7] px-3 py-1.5 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveSocial(social.id)}
                              className="shrink-0 rounded-lg bg-[#252525] px-3 py-1.5 text-xs font-medium text-[#FAFAF7] hover:bg-[#8F6B20]"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSocialId(null)}
                              className="shrink-0 rounded-lg border border-[#EAE3D5] bg-white px-3 py-1.5 text-xs font-medium text-[#777777]"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="border-t border-[#EAE3D5] bg-[#F5F1E8] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-10">
          <p className="text-xs text-[#777777]">
            &copy; {new Date().getFullYear()} {data.fullName}. Digital Marketing Portfolio.
          </p>

          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#EAE3D5] bg-white px-3.5 py-2 text-xs font-medium text-[#252525] transition-colors hover:border-[#C5A253] hover:text-[#8F6B20]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#8F6B20]" />
            <span>Customize Details &amp; Supabase URLs</span>
          </button>
        </div>
      </footer>

      <ImageLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      {isCustomizerOpen && (
        <PortfolioCustomizerModal
          isOpen={isCustomizerOpen}
          data={data}
          onClose={() => setIsCustomizerOpen(false)}
          onSave={(updated) => {
            setData(updated);
            setEmailDraft(updated.contact.email);
          }}
          onReset={() => {
            setData(DEFAULT_PORTFOLIO_DATA);
            setEmailDraft(DEFAULT_PORTFOLIO_DATA.contact.email);
          }}
        />
      )}
    </div>
  );
}
