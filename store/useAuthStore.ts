import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
}
interface AuthAction {
  signIn: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>((set) => {
  return {
    isAuthenticated: false,
    signIn: () => set({ isAuthenticated: true }),
    signOut: () => set({ isAuthenticated: false }),
  };
});
