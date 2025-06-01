"use client";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header"), { ssr: false });
export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
