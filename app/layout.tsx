import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google"; // Import the component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGO² | Unisex T-Shirt",
  description: "Just another stupid brand (that gets you noticed)",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  openGraph: {
    title: "NGO² | Unisex T-Shirt",
    description: "Just another stupid brand (that gets you noticed)",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/assets/images/banner_a.jpg`,
        width: 1200,
        height: 630,
        alt: "NGO² | Unisex T-Shirt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NGO² | Unisex T-Shirt",
    description: "Just another stupid brand (that gets you noticed)",
    images: [`${process.env.NEXT_PUBLIC_DOMAIN}/assets/images/banner_a.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
