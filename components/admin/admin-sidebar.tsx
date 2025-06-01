"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./admin-provider";
import { adminPermissions } from "@/lib/admin-auth";
import {
  LayoutDashboard,
  Package,
  FileText,
  ImageIcon,
  Users,
  Settings,
  X,
  Shield,
} from "lucide-react";

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({
  currentView,
  onViewChange,
  isOpen,
  onClose,
}: AdminSidebarProps) {
  const { user, checkPermission } = useAdmin();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      permission: null,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      permission: adminPermissions.PRODUCTS_VIEW,
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      permission: adminPermissions.CONTENT_VIEW,
    },
    {
      id: "media",
      label: "Media",
      icon: ImageIcon,
      permission: adminPermissions.MEDIA_VIEW,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      permission: adminPermissions.USERS_VIEW,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      permission: adminPermissions.SETTINGS_VIEW,
    },
  ];

  const visibleItems = menuItems.filter(
    (item) => !item.permission || checkPermission(item.permission)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold">NGO² Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role.replace("_", " ")}
              </p>
            </div>
          </div>

          <nav className="space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    currentView === item.id &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
