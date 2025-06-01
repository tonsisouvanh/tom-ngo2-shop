"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { DashboardOverview } from "./dashboard-overview";
import { ProductsManager } from "./products-manager";
import { ContentManager } from "./content-manager";
import { MediaManager } from "./media-manager";
import { UsersManager } from "./users-manager";
import SettingsManager from "./settings-manager";

type AdminView =
  | "dashboard"
  | "products"
  | "content"
  | "media"
  | "users"
  | "settings";

export function AdminDashboard() {
  //   const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [currentView, setCurrentView] = useState<any>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardOverview />;
      case "products":
        return <ProductsManager />;
      case "content":
        return <ContentManager />;
      case "media":
        return <MediaManager />;
      case "users":
        return <UsersManager />;
      case "settings":
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
