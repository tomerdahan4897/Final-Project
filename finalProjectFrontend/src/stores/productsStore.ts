import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductsStoreType } from "../@types";

export const useProductsStore = create<ProductsStoreType>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products: Product[]) => set({ products }),
      addProduct: (product: Product) => {
        set((state) => {
          console.log(product);
          return {
            products: [product, ...state.products],
          };
        });
      },
      removeProduct: (id: string) => {
        return set((state) => {
          return {
            products: state.products.filter((p) => p._id !== id),
          };
        });
      },
      editProduct: (product: Product) => {
        return set((state) => {
          return {
            products: state.products.map((p) =>
              p._id === product._id ? product : p
            ),
          };
        });
      },
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
