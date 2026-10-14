import { memo } from 'react'
import { Plus } from 'lucide-react'
import type { Burger } from '../types'
import { formatearPrecio, urlFoto } from '../config'

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#F77F00"/><text x="50%" y="50%" fill="#fff" font-size="36" font-family="Arial" text-anchor="middle">Hamburguesa</text></svg>',
  )

interface Props {
  burger: Burger
  onAdd: (b: Burger) => void
}

const BurgerCard = memo(function BurgerCard({ burger, onAdd }: Props) {
  return (
    <article className="card">
      <img
        src={urlFoto(burger.foto)}
        alt={burger.nombre}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = FALLBACK
        }}
      />
      <div className="card__body">
        <span className="badge">{burger.categoria}</span>
        <h3>{burger.nombre}</h3>
        <p>{burger.descripcion}</p>
        <div className="card__foot">
          <strong>{formatearPrecio(burger.precio)}</strong>
          <button className="btn btn-rojo" onClick={() => onAdd(burger)}>
            <Plus size={18} /> Agregar
          </button>
        </div>
      </div>
    </article>
  )
})

export default BurgerCard
