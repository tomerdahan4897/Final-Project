import { create } from "zustand";

export type userStateType = {
  isLoggedIn: boolean;
  firstName: string | null;
  email: string | null;
  token: string | null;
  login: (firstName: string, email: string, token: string) => void;
  logout: () => void;
};

export const userStore = create<userStateType>((set) => ({
  //initial state
  isLoggedIn: false,
  firstName: null,
  email: null,
  token: null,

  login: (firstName: string, email: string, token: string) => {
    set((state) => {
      return {
        isLoggedIn: true,
        firstName,
        email,
        token,
      };
    });
  },

  logout: () => {
    set((state) => {
      return {
        isLoggedIn: false,
        firstName: null,
        email: null,
        token: null,
      };
    });
  },
}));

export default userStore;
