import { ThemeMode } from "@/types";
import { create } from "zustand";

interface ThemeStore {
    theme: ThemeMode
    isSystem: boolean;
    setTheme: (theme: ThemeMode) => void;
    setSystemTheme: (flag: boolean) => void;
}

const useThemeStore = create<ThemeStore>(set => ({
    theme: "light",
    isSystem: false,
    setTheme: (theme: ThemeMode) => {
        set({ theme })
    },
    setSystemTheme: (flag: boolean) => {
        set(state => ({ ...state, isSystem: flag }))
    }
}));

export default useThemeStore;

