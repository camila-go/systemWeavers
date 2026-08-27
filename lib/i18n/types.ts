import type { IconName } from "@/components/ui/icon";

export type Tone = "teal" | "navy" | "gold" | "green";

export type Content = {
  /** Per-locale <title> and meta description for the two page routes. */
  meta: {
    title: string;
    description: string;
    aboutTitle: string;
    aboutDescription: string;
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
    seeHow: string;
  };
  capabilities: Array<{
    title: string;
    description: string;
    tone: Tone;
    icon: IconName;
  }>;
  howWeWork: {
    title: string;
    subtitle: string;
    stepLabel: string;
  };
  weaveSteps: Array<{
    step: string;
    title: string;
    description: string;
    shortDescription: string;
    icon: IconName;
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
  };
  services: Array<{
    title: string;
    intro?: string;
    items: string[];
  }>;
  contact: {
    title: string;
    introMobile: string;
    introDesktop: string;
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
