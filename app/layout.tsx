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
  description: "We sell good and modern product",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  openGraph: {
    title: "NGO² | Unisex T-Shirt",
    description: "We sell good and modern product",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/assets/images/cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Unitel It service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NGO² | Unisex T-Shirt",
    description: "We sell good and modern product",
    images: [`${process.env.NEXT_PUBLIC_DOMAIN}/assets/images/cover.jpg`],
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
