import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    itemsCnt: 0,
    setItemsCnt: (itemsCnt) => set({ itemsCnt }),
}));
