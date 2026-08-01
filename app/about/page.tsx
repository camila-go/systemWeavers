import type { Metadata } from "next";
import { AboutPage } from "@/components/about/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about System Weavers Collaborative Consulting — our services, approach, and commitment to community-led health equity.",
};

export default function Page() {
  return <AboutPage />;
}
