"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Youtube, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  url: string;
  username: string;
  color: string;
  hoverColor: string;
}

export function SocialLinks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialPlatforms: SocialPlatform[] = [
    {
      name: "Facebook",
      icon: <Facebook size={32} />,
      url: "https://web.facebook.com/profile.php?id=61577003547664",
      username: "@NGO²",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
    },
    {
      name: "TikTok",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          <path d="M15 8c0 1.657-1.343 3-3 3" />
          <path d="M21 8v4c0 4.418-3.582 8-8 8s-8-3.582-8-8c0-3.418 2.159-6.337 5.172-7.497" />
          <path d="M15 2h-4v10" />
        </svg>
      ),
      url: "https://web.facebook.com/profile.php?id=61577003547664",
      username: "@NGO²",
      color: "bg-black",
      hoverColor: "hover:bg-zinc-800",
    },
    {
      name: "YouTube",
      icon: <Youtube size={32} />,
      url: "https://web.facebook.com/profile.php?id=61577003547664",
      username: "@NGO²",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-700",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Connect With Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {socialPlatforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative"
          >
            <Link href={platform.url} target="_blank" rel="noopener noreferrer">
              <Card className="overflow-hidden h-full pt-0 border-border/40 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10">
                <div
                  className={`h-2 ${
                    platform.color
                  } transition-all duration-300 ${
                    hoveredIndex === index ? "h-3" : ""
                  }`}
                ></div>
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div
                    className={`p-4 rounded-full mb-4 text-white ${
                      platform.color
                    } ${
                      platform.hoverColor
                    } transition-transform duration-300 ${
                      hoveredIndex === index ? "scale-110" : ""
                    }`}
                  >
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {platform.username}
                  </p>
                  <div className="mt-auto">
                    <span
                      className={`inline-flex items-center text-sm font-medium ${
                        hoveredIndex === index
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Follow us
                      <svg
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          hoveredIndex === index ? "translate-x-1" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          <span>Have questions? Contact us directly</span>
        </Link>
      </div>
    </section>
  );
}
