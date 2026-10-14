import { Check, Clock3, Flame, Heart, ShieldCheck, Star, Truck } from 'lucide-react'
import { NOMBRE_NEGOCIO, TELEFONO_WA } from '../config'

export default function MarketingSections() {
  return (
    <>
      <section className="trust-strip" aria-label="Beneficios de la tienda">
        <div className="container trust-strip__grid">
          <div><Flame size={22} /><span><strong>Ingredientes frescos</strong><small>Seleccionados cada día</small></span></div>
          <div><Clock3 size={22} /><span><strong>Listas en minutos</strong><small>Preparación al momento</small></span></div>
          <div><Truck size={22} /><span><strong>Delivery local</strong><small>Llegamos a Huancayo</small></span></div>
          <div><ShieldCheck size={22} /><span><strong>Pedido seguro</strong><small>Confirmación por WhatsApp</small></span></div>
        </div>
      </section>

      <section className="story section">
        <div className="container story__grid">
          <div className="story__image" role="img" aria-label="Hamburguesa artesanal recién preparada" />
          <div className="story__content">
            <p className="eyebrow">Sabor que se reconoce</p>
            <h2>Hechas para disfrutar sin prisa</h2>
            <p>
              En {NOMBRE_NEGOCIO} combinamos pan suave, ingredientes frescos y una
              receta de la casa para que cada mordida tenga el balance perfecto.
            </p>
            <ul className="check-list">
              <li><Check size={18} /> Carne preparada con ingredientes seleccionados</li>
              <li><Check size={18} /> Opciones clásicas, especiales y veggie</li>
              <li><Check size={18} /> Atención cercana y pedidos fáciles</li>
            </ul>
            <a className="btn btn-rojo" href="#catalogo">Descubrir el menú</a>
          </div>
        </div>
      </section>

      <section className="steps section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Simple, rápido y delicioso</p>
            <h2>Tu pedido en tres pasos</h2>
          </div>
          <div className="steps__grid">
            <article><span>01</span><h3>Elige tu favorita</h3><p>Explora el catálogo, filtra por categoría y encuentra tu combinación ideal.</p></article>
            <article><span>02</span><h3>Personaliza tu pedido</h3><p>Añade las unidades que quieras y completa tus datos de entrega.</p></article>
            <article><span>03</span><h3>Recíbela en casa</h3><p>Enviamos el pedido por WhatsApp y coordinamos la entrega contigo.</p></article>
          </div>
        </div>
      </section>

      <section className="reviews section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Lo dicen nuestros clientes</p>
            <h2>Una experiencia para repetir</h2>
          </div>
          <div className="reviews__grid">
            <article><div className="stars"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></div><p>“La Royal llegó caliente y con un sabor increíble. El pedido por WhatsApp fue muy rápido.”</p><strong>— Andrea M.</strong></article>
            <article><div className="stars"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></div><p>“Por fin una opción veggie con mucha personalidad. La Portobello está buenísima.”</p><strong>— Carlos R.</strong></article>
            <article><div className="stars"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></div><p>“Las porciones son generosas y la atención se siente muy cercana. Recomendadísimo.”</p><strong>— Lucía P.</strong></article>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__in">
          <div><Heart size={30} /><h2>¿Listo para tu próxima hamburguesa?</h2><p>Elige tu favorita y convierte hoy en un día más sabroso.</p></div>
          <a className="btn btn-naranja" href={`https://wa.me/${TELEFONO_WA}`} target="_blank" rel="noreferrer">Pedir por WhatsApp</a>
        </div>
      </section>
    </>
  )
}
