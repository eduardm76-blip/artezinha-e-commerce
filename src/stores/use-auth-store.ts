import { useSyncExternalStore } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'sublimator'
} | null

let state = {
  user: null as User,
  requires2FA: false,
}

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

const store = {
  subscribe: (l: () => void) => {
    listeners.add(l)
    return () => listeners.delete(l)
  },
  getSnapshot: () => state,
  login: (email: string) => {
    state = { ...state, requires2FA: true }
    emit()
  },
  verify2FA: (code: string) => {
    state = {
      user: {
        id: '1',
        name: 'Simone Antunes',
        email: 'simoneantunes1581@gmail.com',
        role: 'sublimator',
      },
      requires2FA: false,
    }
    emit()
  },
  logout: () => {
    state = { user: null, requires2FA: false }
    emit()
  },
}

export default function useAuthStore() {
  const snap = useSyncExternalStore(store.subscribe, store.getSnapshot)
  return { ...snap, ...store }
}
