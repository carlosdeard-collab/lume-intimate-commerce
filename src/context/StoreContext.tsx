import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

type StoreContextValue = {
  cart: CartItem[]
  favorites: string[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  toggleFavorite: (id: string) => void
  cartCount: number
  subtotal: number
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined)

function readStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage<CartItem[]>('lume-cart', []))
  const [favorites, setFavorites] = useState<string[]>(() => readStorage<string[]>('lume-favorites', []))

  useEffect(() => localStorage.setItem('lume-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('lume-favorites', JSON.stringify(favorites)), [favorites])

  const value = useMemo(() => ({
    cart,
    favorites,
    addToCart: (product: Product) => setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    }),
    updateQuantity: (id: string, quantity: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    removeFromCart: (id: string) => setCart((current) => current.filter((item) => item.id !== id)),
    toggleFavorite: (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    subtotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
  }), [cart, favorites])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
