import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  brandName: string;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'BB Travels', href: '#bb-travels' },
  { label: 'Research', href: '#research' },
  { label: 'Sitemap', href: '#sitemap' },
  { label: 'Wireframes', href: '#wireframes' },
  { label: 'SEO', href: '#seo' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ brandName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayBrand =
    brandName.trim() && brandName.trim() !== '[YOUR FULL NAME]'
      ? brandName.trim()
      : 'Portfolio';

  return (
    <header className="sticky top-0 z-40 border-b border-[#EAE3D5] bg-[#FAFAF7]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-10">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#hero"
          className="font-display max-w-[190px] truncate whitespace-nowrap shrink-0 text-xl font-semibold tracking-tight text-[#252525] transition-colors hover:text-[#8F6B20] sm:text-2xl"
        >
          {displayBrand}
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative whitespace-nowrap shrink-0 py-1 text-sm font-medium text-[#666666] transition-colors hover:text-[#252525] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#C5A253] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden whitespace-nowrap shrink-0 rounded-lg border border-[#C5A253] bg-[#252525] px-4 py-2 text-xs font-medium tracking-wide text-[#FAFAF7] transition-colors duration-200 hover:bg-[#8F6B20] hover:border-[#8F6B20] sm:inline-flex"
          >
            Contact Me
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#EAE3D5] bg-white text-[#252525] transition-colors hover:border-[#C5A253] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#EAE3D5] bg-white px-4 py-4 lg:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#252525] transition-colors hover:bg-[#F5F1E8] hover:text-[#8F6B20]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#252525] px-4 py-2.5 text-sm font-medium text-[#FAFAF7] transition-colors hover:bg-[#8F6B20]"
            >
              Contact Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
