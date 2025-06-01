import { Product } from "@/types/types";

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "Unisex White",
    description:
      "A comfortable and versatile cotton t-shirt that's perfect for everyday wear. Features a relaxed fit and soft fabric.",
    price: 199000,
    category: "men/women",
    images: [
      "https://res.cloudinary.com/devton/image/upload/v1748692166/ngo2/IMG-20250531-WA0017_yukuvz.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692181/ngo2/IMG-20250531-WA0029_hndgkx.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692173/ngo2/IMG-20250531-WA0023_rg512y.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692290/ngo2/IMG-20250531-WA0008_z84zo7.jpg",
    ],
    sizes: ["m", "l", "xl", "2xl", "ngongo (Freesize)"],
    colors: ["white"],
    isNew: true,
    discount: 0,
    material: "100% Cotton",
    care: "Machine wash cold, tumble dry low",
    madeIn: "Laos",
  },
  {
    id: "2",
    name: "Unisex Black",
    description:
      "A comfortable and versatile cotton t-shirt that's perfect for everyday wear. Features a relaxed fit and soft fabric.",
    price: 199000,
    category: "men/women",
    images: [
      "https://res.cloudinary.com/devton/image/upload/v1748692269/ngo2/IMG-20250531-WA0059_f4i19q.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692168/ngo2/IMG-20250531-WA0018_zejk1z.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692164/ngo2/IMG-20250531-WA0013_psrcjt.jpg",
      "https://res.cloudinary.com/devton/image/upload/v1748692272/ngo2/IMG-20250531-WA0002_baojda.jpg",
    ],
    sizes: ["m", "l", "xl", "2xl", "ngongo (Freesize)"],
    colors: ["black"],
    isNew: true,
    discount: 0,
    material: "100% Cotton",
    care: "Machine wash cold, tumble dry low",
    madeIn: "Laos",
  },
];

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products.find((product) => product.id === id);
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return products
    .filter((product) => product.isNew || product.discount > 0)
    .slice(0, 4);
}

// Get new arrivals
export async function getNewArrivals(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return products.filter((product) => product.isNew).slice(0, 4);
}

// Get related products
export async function getRelatedProducts(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return products
    .filter((product) => product.category === category)
    .slice(0, 4);
}
