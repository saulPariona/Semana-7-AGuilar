import { useState } from 'react'
import { Minus, Plus, Send, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { NOMBRE_NEGOCIO, TELEFONO_WA, formatearPrecio } from '../config'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, total, inc, dec, remove, clear } = useCart()
  const { notify } = useToast()
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')

  const enviarPedido = () => {
    if (items.length === 0) {
      notify('Tu carrito está vacío', 'aviso')
      return
    }
    if (!nombre.trim() || !direccion.trim()) {
      notify('Completa tu nombre y dirección', 'error')
      return
    }
    const lineas = items
      .map((i) => `• ${i.cantidad} x ${i.nombre} - ${formatearPrecio(i.precio * i.cantidad)}`)
      .join('\n')
    const mensaje =
      `*Nuevo pedido - ${NOMBRE_NEGOCIO}*\n\n` +
      `Cliente: ${nombre}\nDirección: ${direccion}\n\n${lineas}\n\n*Total: ${formatearPrecio(total)}*`

    window.open(`https://wa.me/${TELEFONO_WA}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener')
    notify('Pedido enviado a WhatsApp', 'exito')
    clear()
    onClose()
  }

  return (
    <>
      <div className={`overlay ${open ? 'overlay--on' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'drawer--on' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          <h2>Tu pedido</h2>
          <button className="icon-btn drawer__close" onClick={onClose} aria-label="Cerrar carrito">
            <X size={22} />
          </button>
        </div>
        <div className="drawer__items">
          {items.length === 0 && <p className="empty">Aún no agregas hamburguesas.</p>}
          {items.map((i) => (
            <div key={i.id} className="line">
              <div>
                <strong>{i.nombre}</strong>
                <small>{formatearPrecio(i.precio * i.cantidad)}</small>
              </div>
              <div className="line__acc">
                <button
                  className="icon-btn"
                  onClick={() => {
                    dec(i.id)
                    notify(
                      i.cantidad > 1 ? `Quitaste una ${i.nombre}` : `${i.nombre} eliminada del carrito`,
                      'aviso',
                    )
                  }}
                  aria-label="Disminuir"
                >
                  <Minus size={16} />
                </button>
                <span>{i.cantidad}</span>
                <button
                  className="icon-btn"
                  onClick={() => {
                    inc(i.id)
                    notify(`Agregaste otra ${i.nombre}`, 'exito')
                  }}
                  aria-label="Aumentar"
                >
                  <Plus size={16} />
                </button>
                <button
                  className="icon-btn icon-btn--red"
                  onClick={() => {
                    remove(i.id)
                    notify(`${i.nombre} eliminada del carrito`, 'error')
                  }}
                  aria-label="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="drawer__foot">
          <input placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <div className="total">
            <span>Total</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>
          <button className="btn btn-rojo w-full" onClick={enviarPedido}>
            <Send size={18} /> Enviar pedido por WhatsApp
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => {
              clear()
              notify('Carrito vaciado', 'aviso')
            }}
          >
            <Trash2 size={18} /> Vaciar carrito
          </button>
        </div>
      </aside>
    </>
  )
}
