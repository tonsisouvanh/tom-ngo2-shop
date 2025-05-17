import { Product } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (
    product: Product & {
      selectedSize?: string;
      selectedColor?: string;
      quantity?: number;
    }
  ) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product) => {
        set((state) => {
          // Check if the item already exists in the cart with the same size and color
          const existingItemIndex = state.cartItems.findIndex(
            (item) =>
              item.id === product.id &&
              item.selectedSize === product.selectedSize &&
              item.selectedColor === product.selectedColor
          );

          if (existingItemIndex !== -1) {
            // If item exists, update its quantity
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex].quantity += product.quantity || 1;
            return { cartItems: updatedItems };
          } else {
            // If item doesn't exist, add it to the cart
            return {
              cartItems: [
                ...state.cartItems,
                { ...product, quantity: product.quantity || 1 },
              ],
            };
          }
        });
      },

      removeFromCart: (item) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (cartItem) =>
              !(
                cartItem.id === item.id &&
                cartItem.selectedSize === item.selectedSize &&
                cartItem.selectedColor === item.selectedColor
              )
          ),
        }));
      },

      updateQuantity: (item, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.selectedSize === item.selectedSize &&
            cartItem.selectedColor === item.selectedColor
              ? { ...cartItem, quantity }
              : cartItem
          ),
        }));
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
