import { useEffect } from 'react'
import { ArrowRight, ArrowUpRight, LockKeyhole, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function Home() {
  useEffect(() => {
    document.title = 'Lume / Intimidad a tu manera'
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-copy">
          <span className="eyebrow">Bienestar íntimo / 2026</span>
          <h1>Tu intimidad,<br /><i>a tu manera.</i></h1>
          <p>Una selección premium para explorar, disfrutar y conectar. Diseñada para sentirse bien, de verdad.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/catalogo">
              Explorar colección <ArrowRight size={16} />
            </Link>
            <Link className="text-link" to="/nosotros">
              Conoce Lume <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="hero-note">
          <span>01</span>
          <span>Diseño consciente</span>
        </div>
      </section>
      <section className="trust-strip">
        <span><ShieldCheck size={17} /> Compra discreta y segura</span>
        <span><LockKeyhole size={17} /> Tus datos, protegidos</span>
        <span><Truck size={17} /> Empaque sin marcas</span>
      </section>
      <section className="section intro-section">
        <div>
          <span className="eyebrow">Elegir también es cuidarte</span>
          <h2>Lo íntimo también<br /><i>puede ser bello.</i></h2>
        </div>
        <div className="intro-copy">
          <p>Objetos bien diseñados, materiales que se sienten bien y una experiencia que respeta tu privacidad. Sin prisa. Sin juicios.</p>
          <Link className="text-link" to="/catalogo">
            Ver toda la colección <ArrowRight />
          </Link>
        </div>
      </section>
      <section className="section category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Explora por intención</span>
            <h2>Encuentra tu <i>ritual.</i></h2>
          </div>
          <Link className="text-link" to="/catalogo">Ver todo <ArrowRight /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className={`category-card category-${index}`} to={`/categoria/${category.name.toLowerCase()}`} key={category.name}>
              <img src={category.image} alt="" loading="lazy" />
              <div>
                <span>{category.label}</span>
                <h3>{category.name}</h3>
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="feature-band">
        <div className="feature-art">
          <div className="feature-orbit" />
          <span>lume / care</span>
        </div>
        <div className="feature-copy">
          <span className="eyebrow">El ritual empieza aquí</span>
          <h2>Pequeños detalles.<br /><i>Grandes sensaciones.</i></h2>
          <p>Desde un masaje lento hasta una nueva forma de conectar: encuentra piezas hechas para acompañarte.</p>
          <Link className="button button-light" to="/categoria/masaje">Descubrir bienestar <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="section product-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">La edición actual</span>
            <h2>Favoritos de <i>Lume.</i></h2>
          </div>
          <Link className="text-link" to="/catalogo">Ver colección <ArrowRight /></Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
      <section className="newsletter">
        <span className="eyebrow">Una nota de vez en cuando</span>
        <h2>Ideas para sentirte<br /><i>más tú.</i></h2>
        <p>Recomendaciones, novedades y conversaciones honestas sobre bienestar íntimo.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" required placeholder="Tu correo electrónico" aria-label="Tu correo electrónico" />
          <button aria-label="Suscribirme"><ArrowRight size={18} /></button>
        </form>
        <small>Sin ruido. Puedes salir cuando quieras.</small>
      </section>
    </main>
  )
}
