export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin" | "editor" | "viewer";
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  type: "page" | "blog" | "banner" | "announcement";
  content: string;
  excerpt?: string;
  status: "draft" | "published" | "archived";
  featuredImage?: string;
  images: string[];
  videos: string[];
  seo: {
    title?: string;
    description?: string;
    keywords: string[];
  };
  author: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: "image" | "video" | "document";
  mimeType: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string;
  caption?: string;
  folder?: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categories: string[];
}

export interface AdminProduct extends Product {
  sku: string;
  stock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  seo: {
    title?: string;
    description?: string;
    keywords: string[];
  };
  status: "draft" | "published" | "archived";
  featured: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: number;
  lowStockProducts: number;
  publishedContent: number;
  draftContent: number;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  currency: string;
  timezone: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
  };
}
