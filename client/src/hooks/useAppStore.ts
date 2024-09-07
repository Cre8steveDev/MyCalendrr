import useStore from '@/state/useStore';

// Accessing States
export const useAppState = () => useStore((state) => state.app);
export const useUser = () => useStore((state) => state.app.user);
export const useToken = () => useStore((state) => state.app.token);

// Hooks for actions
export const useLogin = () => useStore((state) => state.login);
export const useLogout = () => useStore((state) => state.logout);
