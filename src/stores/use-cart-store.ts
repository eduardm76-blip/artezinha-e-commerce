import { useSyncExternalStore } from 'react'
import { Product } from '@/lib/mock-data'

export type CartItem = {
  id: string
  product: Product
  quantity: number
  customization?: string
}

let state = {
  items: [] as CartItem[],
  isOpen: false,
}

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

const store = {
  subscribe: (l: () => void) => {
    listeners.add(l)
    return () => listeners.delete(l)
  },
  getSnapshot: () => state,
  addItem: (item: Omit<CartItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    state = { ...state, items: [...state.items, { ...item, id }], isOpen: true }
    emit()
  },
  removeItem: (id: string) => {
    state = { ...state, items: state.items.filter((i) => i.id !== id) }
    emit()
  },
  setIsOpen: (isOpen: boolean) => {
    state = { ...state, isOpen }
    emit()
  },
  clear: () => {
    state = { ...state, items: [] }
    emit()
  },
}

export default function useCartStore() {
  const snap = useSyncExternalStore(store.subscribe, store.getSnapshot)
  return { ...snap, ...store }
}
