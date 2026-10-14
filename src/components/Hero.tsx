import { Phone, UtensilsCrossed } from 'lucide-react'
import { NOMBRE_NEGOCIO, TELEFONO_VISIBLE, TELEFONO_WA, urlFoto } from '../config'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url(${urlFoto('1568901346375-23c9450c58cd', 1400)})`,
      }}
    >
      <div className="container">
        <p className="hero__tag">Hamburguesas artesanales</p>
        <h1>{NOMBRE_NEGOCIO}</h1>
        <p className="hero__txt">
          Elige entre 16 hamburguesas y envía tu pedido directo a nuestro WhatsApp.
        </p>
        <div className="hero__btns">
          <a className="btn btn-naranja" href="#catalogo">
            <UtensilsCrossed size={18} /> Ver catálogo
          </a>
          <a
            className="btn btn-outline-w"
            href={`https://wa.me/${TELEFONO_WA}`}
            target="_blank"
            rel="noreferrer"
          >
            <Phone size={18} /> {TELEFONO_VISIBLE}
          </a>
        </div>
      </div>
    </section>
  )
}
