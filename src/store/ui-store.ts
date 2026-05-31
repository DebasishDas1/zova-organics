import { create } from 'zustand'

interface UIState {
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({
      mobileMenuOpen: !state.mobileMenuOpen,
    })),

  closeMobileMenu: () =>
    set({
      mobileMenuOpen: false,
    }),

  setMobileMenuOpen: (open) =>
    set({
      mobileMenuOpen: open,
    }),
}))
