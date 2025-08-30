const { create } = require("zustand");

export const authStore = create((set) => ({
  user: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: 'developer'
  },
  signUp: (user) => set({ user }),
  signIn: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
