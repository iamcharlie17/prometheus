const { create } = require("zustand");

export const authStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
