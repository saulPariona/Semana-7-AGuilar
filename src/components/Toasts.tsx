import { useEffect } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import type { Toast } from '../types'

const ICONOS = {
  exito: CircleCheck,
  info: Info,
  error: CircleAlert,
  aviso: TriangleAlert,
}

interface ItemProps {
  toast: Toast
  onClose: (id: number) => void
}

function ToastItem({ toast, onClose }: ItemProps) {
  useEffect(() => {
    const t = setTimeout(() => onClose(toast.id), 3500)
    return () => clearTimeout(t)
  }, [toast.id, onClose])

  const Icono = ICONOS[toast.tipo]

  return (
    <div className={`toast toast--${toast.tipo}`} role="status">
      <Icono size={20} />
      <span>{toast.mensaje}</span>
      <button onClick={() => onClose(toast.id)} aria-label="Cerrar alerta">
        <X size={16} />
      </button>
    </div>
  )
}

interface Props {
  toasts: Toast[]
  onClose: (id: number) => void
}

export default function Toasts({ toasts, onClose }: Props) {
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  )
}
