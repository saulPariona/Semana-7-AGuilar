import { Beef, Moon, ShoppingCart, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { NOMBRE_NEGOCIO } from '../config'

interface Props {
  onOpenCart: () => void
}

export default function Header({ onOpenCart }: Props) {
  const { theme, toggle } = useTheme()
  const { count } = useCart()
  const { notify } = useToast()

  const cambiarTema = () => {
    toggle()
    notify(theme === 'dia' ? 'Modo noche activado' : 'Modo día activado', 'info')
  }

  return (
    <header className="header">
      <div className="container header__in">
        <a className="logo" href="#inicio">
          <Beef size={28} />
          <span>{NOMBRE_NEGOCIO}</span>
        </a>
        <nav className="header__acc">
          <button
            className="theme-toggle"
            onClick={cambiarTema}
            aria-label={theme === 'dia' ? 'Activar modo noche' : 'Activar modo día'}
            title={theme === 'dia' ? 'Activar modo noche' : 'Activar modo día'}
          >
            {theme === 'dia' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="btn btn-rojo" onClick={onOpenCart}>
            <ShoppingCart size={18} />
            <span className="hide-sm">Carrito</span>
            <b className="count">{count}</b>
          </button>
        </nav>
      </div>
    </header>
  )
}
