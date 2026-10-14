import { MapPin, Phone } from 'lucide-react'
import { DUENO, NOMBRE_NEGOCIO, TELEFONO_VISIBLE } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__in">
        <strong>{NOMBRE_NEGOCIO}</strong>
        <span>Propietario: {DUENO}</span>
        <span>
          <Phone size={16} /> {TELEFONO_VISIBLE}
        </span>
        <span>
          <MapPin size={16} /> Huancayo, Perú
        </span>
      </div>
    </footer>
  )
}
