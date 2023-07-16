import { create } from "zustand";
import { Role } from "../@types";

export type userStateType = {
  isLoggedIn: boolean;
  firstName: string | null;
  email: string | null;
  token: string | null;
  role: Role;
  login: (firstName: string, email: string, token: string, role: Role) => void;
  logout: () => void;
};

export const userStore = create<userStateType>((set) => ({
  //initial state
  isLoggedIn: false,
  firstName: null,
  email: null,
  token: null,
  role: null,

  login: (firstName: string, email: string, token: string, role: Role) => {
    set((state) => {
      return {
        isLoggedIn: true,
        firstName,
        email,
        token,
        role,
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
        role: null,
      };
    });
  },
}));

export default userStore;
