import type { IconName } from "@/components/ui/icon";

export type Tone = "teal" | "navy" | "gold" | "green";

/**
 * Ties a home "What we do" card to its counterpart accordion on the About
 * page. The two live in separate arrays that only matched by convention;
 * sharing one union means a typo or a rename on either side fails to compile
 * rather than silently linking a card to nothing.
 *
 * Also the URL fragment (`/about#grants-management`), so it stays stable
 * across locales and is safe to link to from outside the site.
 */
export type ServiceSlug =
  | "community-engagement"
  | "grants-management"
  | "monitoring-evaluation-learning"
  | "communications"
  | "language-access"
  | "events-management";

export type Content = {
  /** Per-locale <title> and meta description for the two page routes. */
  meta: {
    title: string;
    description: string;
    aboutTitle: string;
    aboutDescription: string;
    valuesTitle: string;
    valuesDescription: string;
  };
  notFound: {
    title: string;
    body: string;
    backHome: string;
  };
  site: {
    name: string;
    tagline: string;
    email: string;
    address: string[];
    certifications: string;
  };
  nav: {
    whatWeDo: string;
    about: string;
    values: string;
    home: string;
    contactUs: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    mobileNavLabel: string;
    /** Accessible name for the logo link back to the home page. */
    homeLink: string;
  };
  footer: {
    collaborativeConsulting: string;
    locationLine: string;
    explore: string;
    connect: string;
    contact: string;
    copyright: string;
    designedBy: string;
  };
  hero: {
    overline: string;
    subline: string;
    titleLead: string;
    titleRest: string;
    body: string;
    cta: string;
  };
  whatWeDo: {
    title: string;
    subtitle: string;
  };
  capabilities: Array<{
    slug: ServiceSlug;
    title: string;
    description: string;
    tone: Tone;
    icon: IconName;
  }>;
  /**
   * The WEAVE Method™ section on the home page. `title` omits the ™ so the
   * component can set it as a superscript; keep it out of the string.
   */
  weave: {
    title: string;
    tagline: string;
    body: string;
    acronymTitle: string;
    practiceTitle: string;
    closing: string;
  };
  /** The five letters of WEAVE, in order — the acronym only works in sequence. */
  weaveLetters: Array<{
    letter: string;
    /** The word the letter stands for, set as its own subheading. */
    keyword: string;
    detail: string;
  }>;
  weaveSteps: Array<{
    step: string;
    title: string;
  }>;
  getToKnowUs: {
    title: string;
    cta: string;
  };
  founders: Array<{
    name: string;
    role: string;
    image: string;
  }>;
  aboutCopy: string[];
  why: {
    title: string;
    paragraphs: string[];
  };
  /** Homepage FAQ. Also emitted as FAQPage JSON-LD from `app/page.tsx`. */
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  visionMission: {
    visionLabel: string;
    missionLabel: string;
    vision: string;
    mission: string;
  };
  about: {
    title: string;
    heroBody: string;
    servicesTitle: string;
    /** Label on the About page's link across to the values page. */
    valuesLinkTitle: string;
    valuesLinkBody: string;
  };
  /** `/about/values` — vision, mission, and the six core values. */
  values: {
    title: string;
    heroBody: string;
    coreValuesTitle: string;
    coreValuesIntro: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  services: Array<{
    slug: ServiceSlug;
    title: string;
    intro?: string;
    items: string[];
  }>;
  contact: {
    title: string;
    intro: string;
    fullName: string;
    email: string;
    message: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderMessage: string;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    networkError: string;
    /** Shown when the API fails server-side; `{email}` is replaced at render. */
    serverError: string;
    fixFields: string;
    somethingWrong: string;
  };
  atAGlance: {
    naics: string;
    certifications: string;
  };
};
