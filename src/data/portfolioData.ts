export interface SocialLinkItem {
  id: string;
  platform: string;
  placeholder: string;
  url: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
}

export interface DesignProcessItem {
  id: string;
  stageLabel: string;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface PaperSketchItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
  secondaryImageUrl?: string;
}

export interface SeoPillarItem {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
}

/**
 * Central Supabase Public Image URL Configuration
 * Replace any URL below with your Supabase Storage public image URL.
 */
export const PORTFOLIO_IMAGES = {
  profileImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/About%20me/profile.jpeg',
  bbTravelsImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/bbTravels.jpeg',
  marketResearchImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/research/research.jpeg',
  uspImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/usp.jpeg',
  frontendSitemapImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/frontendSitemap.jpeg',
  backendSitemapImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/backendSitemap.jpeg',
  paperSketchImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/wireframe.jpeg',
  finalWebsiteImage:
    'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/bbTravels.jpeg',
  seoImage: '',
  additionalGalleryImages: [
    {
      id: 'gallery-research-sheet',
      title: 'Market & Competitor Research Sheet',
      category: 'Research Reference',
      caption: 'Original research documentation informing page structure and content hierarchy.',
      imageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/research/research.jpeg',
    },
    {
      id: 'gallery-frontend-map',
      title: 'BB Travels Frontend Sitemap',
      category: 'Planning Blueprint',
      caption: 'Frontend navigation blueprint mapped prior to final UI implementation.',
      imageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/frontendSitemap.jpeg',
    },
  ] as GalleryItem[],
  paperSketchImages: [
    {
      id: 'sketch-frontend-sitemap',
      title: 'Frontend Sitemap – Original Hand-Drawn Sketch',
      category: 'Original Hand-Drawn Frontend Sitemap',
      caption: 'Original hand-drawn frontend sitemap sketch mapping top-level navigation and page structure.',
      imageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/paper%20sketch/frontendsitemap.jpeg',
    },
    {
      id: 'sketch-backend-sitemap',
      title: 'Backend Sitemap – Original Hand-Drawn Sketch',
      category: 'Original Hand-Drawn Backend Sitemap',
      caption: 'Original hand-drawn backend sitemap sketch outlining administrative and booking workflows.',
      imageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/paper%20sketch/backendsitemap.jpeg',
    },
    {
      id: 'sketch-wireframe',
      title: 'Wireframe – Original Hand-Drawn Sketch',
      category: 'Original Hand-Drawn Wireframe',
      caption: 'Two original hand-drawn wireframe pages displayed together prior to digital implementation.',
      imageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/paper%20sketch/wireframe-1.jpeg',
      secondaryImageUrl:
        'https://zzmnbatzfflzqrfudsxr.supabase.co/storage/v1/object/public/portfolio-assets/paper%20sketch/wireframe-2.jpeg',
    },
  ] as PaperSketchItem[],
};

export interface PortfolioData {
  fullName: string;
  heroIntro: string;
  profileImage: string;
  about: {
    introduction: string;
    interests: string;
    learningJourney: string;
  };
  bbTravels: {
    name: string;
    type: string;
    screenshotUrl: string;
    overview: string;
    objectives: string[];
    features: string[];
    technologies: string[];
    liveUrl: string;
  };
  marketResearch: {
    title: string;
    description: string;
    imageUrl: string;
  };
  usp: {
    title: string;
    explanation: string;
    imageUrl: string;
  };
  sitemaps: {
    frontendTitle: string;
    frontendUrl: string;
    frontendCaption: string;
    backendTitle: string;
    backendUrl: string;
    backendCaption: string;
  };
  designProcess: {
    items: DesignProcessItem[];
    additionalGalleryImages: GalleryItem[];
  };
  paperSketchImages: PaperSketchItem[];
  seo: {
    sharedImageUrl: string;
    pillars: SeoPillarItem[];
  };
  contact: {
    phone: string;
    whatsappNumber: string;
    email: string;
    socialLinks: SocialLinkItem[];
  };
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  fullName: 'Niroja M.',
  heroIntro:
    'Digital marketing practitioner crafting research-led web experiences, structured user journeys, and clear online brand presence.',
  profileImage: PORTFOLIO_IMAGES.profileImage,
  about: {
    introduction:
      'I am Niroja M, a digital marketing learner building practical web projects grounded in structured research, thoughtful planning, and user-focused design.',
    interests:
      'My interests span market research, competitor positioning, website information architecture, wireframing, and search engine optimization.',
    learningJourney:
      'Through hands-on project work—from initial research and hand-drawn sketches to complete responsive websites—I focus on turning clear strategic thinking into clean digital experiences.',
  },
  bbTravels: {
    name: 'BB Travels',
    type: 'Travel & Bus Ticket Booking Website',
    screenshotUrl: PORTFOLIO_IMAGES.bbTravelsImage,
    overview:
      'BB Travels is a premium bus travel and online ticket booking website developed to deliver clear route discovery, structured package information, and effortless booking enquiries.',
    objectives: [
      'Create a clean, trustworthy online booking experience for bus travellers.',
      'Organize routes, schedules, and travel details with intuitive navigation across devices.',
      'Structure page content and sitemaps to support foundational digital marketing and SEO readiness.',
    ],
    features: [
      'Bus route and ticket booking interface with clear visual hierarchy',
      'Responsive layout tailored for desktop, tablet, and mobile travellers',
      'Dedicated frontend user journey and backend administrative architecture',
      'Direct enquiry and contact pathways for quick booking support',
    ],
    technologies: [
      'HTML5 & CSS3',
      'React & TypeScript',
      'Tailwind CSS',
      'Supabase Storage',
      'Responsive Web Architecture',
    ],
    liveUrl: 'https://bbtravels-madurai.vercel.app',
  },
  marketResearch: {
    title: 'Market Research & Competitor Analysis',
    description:
      'Complete market research and competitor comparison evaluating traveller expectations, booking usability, and positioning opportunities before designing the BB Travels experience.',
    imageUrl: PORTFOLIO_IMAGES.marketResearchImage,
  },
  usp: {
    title: 'USP – Unique Selling Proposition',
    explanation:
      'Complete USP research outlining the core differentiators that set BB Travels apart for modern bus travellers.',
    imageUrl: PORTFOLIO_IMAGES.uspImage,
  },
  sitemaps: {
    frontendTitle: 'Frontend Sitemap',
    frontendUrl: PORTFOLIO_IMAGES.frontendSitemapImage,
    frontendCaption:
      'BB Travels Website Frontend Sitemap mapping public navigation and passenger booking pathways.',
    backendTitle: 'Backend Sitemap',
    backendUrl: PORTFOLIO_IMAGES.backendSitemapImage,
    backendCaption:
      'BB Travels Website Backend Sitemap organizing administrative controls, routes, and booking management.',
  },
  designProcess: {
    items: [
      {
        id: 'process-paper-sketch',
        stageLabel: 'Stage 01 · Wireframe',
        title: 'Wireframe',
        caption:
          'Initial wireframe planning layout balance, section sequence, and navigation flow.',
        imageUrl: PORTFOLIO_IMAGES.paperSketchImage,
      },
      {
        id: 'process-final-website',
        stageLabel: 'Stage 02 · Implementation',
        title: 'Final Website Design',
        caption:
          'Final BB Travels website design translating the wireframe into a complete responsive interface.',
        imageUrl: PORTFOLIO_IMAGES.finalWebsiteImage,
      },
    ],
    additionalGalleryImages: PORTFOLIO_IMAGES.additionalGalleryImages,
  },
  paperSketchImages: PORTFOLIO_IMAGES.paperSketchImages,
  seo: {
    sharedImageUrl: PORTFOLIO_IMAGES.seoImage,
    pillars: [
      {
        id: 'seo-keyword',
        title: 'Keyword Research',
        summary: 'Search intent mapping and keyword planning for travel and bus booking queries.',
        imageUrl: PORTFOLIO_IMAGES.seoImage,
      },
      {
        id: 'seo-onpage',
        title: 'On-Page SEO',
        summary: 'Semantic headings, page titles, meta descriptions, and internal link structure.',
        imageUrl: PORTFOLIO_IMAGES.seoImage,
      },
      {
        id: 'seo-technical',
        title: 'Technical SEO',
        summary: 'Site speed, mobile responsiveness, crawlability, and XML sitemap readiness.',
        imageUrl: PORTFOLIO_IMAGES.seoImage,
      },
      {
        id: 'seo-gsc',
        title: 'Google Search Console',
        summary: 'Domain verification, indexing status checks, and search coverage setup.',
        imageUrl: PORTFOLIO_IMAGES.seoImage,
      },
      {
        id: 'seo-performance',
        title: 'SEO Performance',
        summary: 'Placeholder ready for future verified search performance documentation.',
        imageUrl: PORTFOLIO_IMAGES.seoImage,
      },
    ],
  },
  contact: {
    phone: '9751331659',
    whatsappNumber: '9751331659', 
    email: '[Your email]',
    socialLinks: [
      { id: 'social-linkedin', platform: 'LinkedIn', placeholder: '[YOUR LINKEDIN URL]', url: '' },
      { id: 'social-instagram', platform: 'Instagram', placeholder: 'bb_travels', url: '' },
    ],
  },
};
