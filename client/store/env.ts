import { create } from "zustand";

interface EnvStore {
  env: Record<string, string | undefined>;
  setEnv: (env: Record<string, string | undefined>) => void;
}

export const useEnvStore = create<EnvStore>((set) => ({
  env: {},
  setEnv: (env) => {
    set({ env });
  },
}));
