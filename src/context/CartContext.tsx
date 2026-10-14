import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Burger, CartItem } from '../types'

type Action =
  | { type: 'add'; burger: Burger }
  | { type: 'inc'; id: number }
  | { type: 'dec'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' }

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existe = state.find((i) => i.id === action.burger.id)
      return existe
        ? state.map((i) => (i.id === existe.id ? { ...i, cantidad: i.cantidad + 1 } : i))
        : [...state, { ...action.burger, cantidad: 1 }]
    }
    case 'inc':
      return state.map((i) => (i.id === action.id ? { ...i, cantidad: i.cantidad + 1 } : i))
    case 'dec':
      return state.flatMap((i) =>
        i.id !== action.id ? [i] : i.cantidad > 1 ? [{ ...i, cantidad: i.cantidad - 1 }] : [],
      )
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
  }
}

interface CartCtx {
  items: CartItem[]
  count: number
  total: number
  add: (b: Burger) => void
  inc: (id: number) => void
  dec: (id: number) => void
  remove: (id: number) => void
  clear: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])

  const add = useCallback((burger: Burger) => dispatch({ type: 'add', burger }), [])
  const inc = useCallback((id: number) => dispatch({ type: 'inc', id }), [])
  const dec = useCallback((id: number) => dispatch({ type: 'dec', id }), [])
  const remove = useCallback((id: number) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.cantidad, 0),
      total: items.reduce((s, i) => s + i.precio * i.cantidad, 0),
      add,
      inc,
      dec,
      remove,
      clear,
    }),
    [items, add, inc, dec, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
