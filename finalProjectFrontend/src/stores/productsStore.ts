import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../@types";

export const useProductsStore = create(
  persist(
    (set) => ({
      products: [],
      setProducts: (products: Product[]) => set({ products }),
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
