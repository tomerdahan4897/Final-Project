import { create } from "zustand";
import { ProductForCart } from "../@types";

export type cartStateType = {
  products: ProductForCart[];
  addProduct: (product: ProductForCart) => void;
  updateProduct: (id: string, quantity: number) => void;
  removeProduct: (id: string) => void;
};

const useCartStore = create<cartStateType>((set) => ({
  //initial state
  products: [],

  addProduct: (product: ProductForCart) => {
    console.log("set product", product);

    set((state) => {
      const index = state.products.findIndex(
        (p) => p.product._id === product.product._id
      );
      if (index !== -1) {
        return state.products;
      } else {
        return { products: [...state.products, product] };
      }
    });
  },

  updateProduct: (id: string, quantity: number) => {
    set((state) => {
      const index = state.products.findIndex((p) => p.product._id === id);
      state.products[index].quantity = quantity;
      return { products: [...state.products] };
    });
  },

  removeProduct: (id: string) => {
    set((state) => {
      state.products = state.products.filter((p) => p.product._id !== id);
      return { products: [...state.products] };
    });
  },
}));

export default useCartStore;
