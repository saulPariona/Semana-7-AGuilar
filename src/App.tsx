import { useCallback, useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import MarketingSections from './components/MarketingSections'
import { useFetch } from './hooks/useFetch'
import { useCart } from './context/CartContext'
import { useToast } from './context/ToastContext'
import type { Burger } from './types'

export default function App() {
  const { data, loading, error, refetch } = useFetch<Burger[]>('/burgers.json')
  const { add } = useCart()
  const { notify } = useToast()
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    if (data) notify(`Catálogo cargado: ${data.length} hamburguesas`, 'info')
  }, [data, notify])

  useEffect(() => {
    if (error) notify(`No se pudo cargar el catálogo (${error})`, 'error')
  }, [error, notify])

  const handleAdd = useCallback(
    (b: Burger) => {
      add(b)
      notify(`${b.nombre} agregada al carrito`, 'exito')
    },
    [add, notify],
  )
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <>
      <Header onOpenCart={openCart} />
      <main>
        <Hero />
        <MarketingSections />
        {loading && <p className="container section empty catalog-loading">Cargando hamburguesas...</p>}
        {error && (
          <div className="container section">
            <button className="btn btn-rojo" onClick={refetch}>
              <RotateCcw size={18} /> Reintentar
            </button>
          </div>
        )}
        {data && <Catalog burgers={data} onAdd={handleAdd} />}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  )
}
