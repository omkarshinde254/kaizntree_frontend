import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    itemsCnt: 0,
    setItemsCnt: (itemsCnt) => set({ itemsCnt }),
    jwt: "",
    setJwt: (jwt) => set({ jwt }),

    baseURL: "https://kaizntree-backend.vercel.app/",
    // baseURL: "http://localhost:8000/",
}));
