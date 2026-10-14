import { useCallback, useMemo, useRef, useState } from 'react'
import { Beef, Drumstick, Flame, LayoutGrid, Leaf, RotateCcw, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Burger, Categoria } from '../types'
import BurgerCard from './BurgerCard'
import { useToast } from '../context/ToastContext'

type Filtro = 'Todas' | Categoria
type Orden = 'normal' | 'asc' | 'desc'

const FILTROS: { id: Filtro; icono: LucideIcon }[] = [
  { id: 'Todas', icono: LayoutGrid },
  { id: 'Clásicas', icono: Beef },
  { id: 'Pollo', icono: Drumstick },
  { id: 'Especiales', icono: Flame },
  { id: 'Veggie', icono: Leaf },
]

interface Props {
  burgers: Burger[]
  onAdd: (b: Burger) => void
}

export default function Catalog({ burgers, onAdd }: Props) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<Filtro>('Todas')
  const [orden, setOrden] = useState<Orden>('normal')
  const inputRef = useRef<HTMLInputElement>(null)
  const { notify } = useToast()

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase()
    const lista = burgers.filter(
      (b) =>
        (cat === 'Todas' || b.categoria === cat) &&
        (b.nombre.toLowerCase().includes(q) || b.descripcion.toLowerCase().includes(q)),
    )
    if (orden === 'asc') return [...lista].sort((a, b) => a.precio - b.precio)
    if (orden === 'desc') return [...lista].sort((a, b) => b.precio - a.precio)
    return lista
  }, [burgers, query, cat, orden])

  const cambiarCategoria = useCallback(
    (nueva: Filtro) => {
      setCat(nueva)
      notify(nueva === 'Todas' ? 'Mostrando todas las hamburguesas' : `Filtrado por: ${nueva}`, 'info')
    },
    [notify],
  )

  const limpiar = useCallback(() => {
    setQuery('')
    setCat('Todas')
    setOrden('normal')
    inputRef.current?.focus()
    notify('Filtros restablecidos', 'aviso')
  }, [notify])

  return (
    <section id="catalogo" className="container section">
      <h2>Nuestro catálogo</h2>
      <div className="filters">
        <label className="search">
          <Search size={18} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Buscar hamburguesa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select value={orden} onChange={(e) => setOrden(e.target.value as Orden)} aria-label="Ordenar por precio">
          <option value="normal">Orden original</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
        <button className="btn btn-outline" onClick={limpiar}>
          <RotateCcw size={18} /> Limpiar
        </button>
      </div>
      <div className="chips">
        {FILTROS.map(({ id, icono: Icono }) => (
          <button
            key={id}
            className={`chip ${cat === id ? 'chip--on' : ''}`}
            onClick={() => cambiarCategoria(id)}
          >
            <Icono size={16} /> {id}
          </button>
        ))}
      </div>
      <p className="result">{filtradas.length} resultado(s)</p>
      {filtradas.length === 0 ? (
        <p className="empty">No encontramos hamburguesas con ese filtro.</p>
      ) : (
        <div className="grid">
          {filtradas.map((b) => (
            <BurgerCard key={b.id} burger={b} onAdd={onAdd} />
          ))}
        </div>
      )}
    </section>
  )
}
