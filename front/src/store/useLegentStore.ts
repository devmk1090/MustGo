import { create } from "zustand"

interface LegentState {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const useLegentStore = create<LegentState>(set => ({
    isVisible: false,
    setIsVisible: (isVisible: boolean) =>
        set({ isVisible }),
}))

export default useLegentStore;