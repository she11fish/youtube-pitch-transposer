import { create } from "zustand";

interface VideoState {
  pitch: number;
  changePitchFromSlider: (by: number[]) => void;
  changePitchFromInput: (value: number) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  pitch: 0,
  changePitchFromSlider: (value) => {
    set({ pitch: value[0] });
  },
  changePitchFromInput: (value) => {
    set({ pitch: value });
  },
}));
