import type { IconName } from "@/components/ui/icon";

export type Tone = "teal" | "navy" | "gold" | "green";

export type Content = {
  site: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string[];
    certifications: string;
  };
  nav: {
    whatWeDo: string;
    about: string;
    home: string;
    contactUs: string;
    language: string;
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
    fixFields: string;
    somethingWrong: string;
  };
  atAGlance: {
    naics: string;
    certifications: string;
  };
};
