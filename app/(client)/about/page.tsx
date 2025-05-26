import { AboutBrands } from "@/components/about-brands";
import { AboutHero } from "@/components/about-hero";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | NGO²",
  description: "Learn more about NGO² and connect with us on social media.",
};

export default async function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <SocialLinks />
      <AboutBrands />
    </main>
  );
}
