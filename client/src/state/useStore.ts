import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState } from '../types/index';

const app = {
  user: null,
  token: null,
};

// Create Zustand store
const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        app: app,
        login: (data) => set(() => ({ app: data })),
        logout: () => set(() => ({ app: app })),
      }),
      { name: 'appStore' }
    )
  )
);

export default useStore;
