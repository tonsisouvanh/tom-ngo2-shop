import type React from "react";
import { AdminProvider } from "@/components/admin/admin-provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin Panel | NGO²",
  description: "NGO² Administration Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
        <Toaster />
      </div>
    </AdminProvider>
  );
}
