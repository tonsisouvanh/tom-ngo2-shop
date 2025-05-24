import { AboutBrands } from "@/components/about-brands";
import { AboutHero } from "@/components/about-hero";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | StyleHub",
  description: "Learn more about StyleHub and connect with us on social media.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <SocialLinks />
      {/* <AboutValues /> */}
      <AboutBrands />
    </main>
  );
}
