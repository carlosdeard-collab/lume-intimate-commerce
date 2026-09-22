import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, LockKeyhole } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice, whatsappLink } from '../config'

export default function Checkout() {
  const { cart, subtotal, clearCart } = useStore()
  const [done, setDone] = useState(false)
  const [orderNumber] = useState(() => Math.floor(Math.random() * 9000 + 1000))
  const shipping = subtotal >= 250000 ? 0 : 14900

  useEffect(() => {
    document.title = 'Checkout — Lume'
  }, [])

  if (done) {
    return (
      <main className="success-page">
        <div className="success-icon">
          <Check />
        </div>
        <span className="eyebrow">Pedido confirmado</span>
        <h1>
          Gracias por elegir<br />
          <i>tu bienestar.</i>
        </h1>
        <p>
          Tu pedido <strong>#LM-{orderNumber}</strong> está siendo preparado. Recibirás los detalles de entrega en tu correo.
        </p>
        <a
          className="button button-primary"
          href={whatsappLink('Hola, acabo de realizar una compra en Lume y quiero confirmar los detalles.')}
          target="_blank"
          rel="noreferrer"
        >
          Contactar por WhatsApp <ArrowRight size={16} />
        </a>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <Link className="back-link" to="/carrito">
          <ArrowLeft size={16} /> Volver al carrito
        </Link>
        <span className="eyebrow">Checkout demo</span>
        <h1>Un último paso.</h1>
        <p>Tu información se utiliza solo para preparar y entregar tu pedido.</p>
      </div>
      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Tu carrito está vacío.</h2>
          <Link className="text-link" to="/catalogo">
            Volver a la colección <ArrowRight />
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={(event) => {
              event.preventDefault()
              setDone(true)
              clearCart()
            }}
          >
            <fieldset>
              <legend>Datos de contacto</legend>
              <div className="form-grid">
                <label>
                  Nombre
                  <input required placeholder="Tu nombre" />
                </label>
                <label>
                  Apellido
                  <input required placeholder="Tu apellido" />
                </label>
                <label>
                  Correo electrónico
                  <input required type="email" placeholder="nombre@correo.com" />
                </label>
                <label>
                  Teléfono
                  <input required type="tel" placeholder="300 000 0000" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Entrega</legend>
              <label>
                Dirección
                <input required placeholder="Calle, número, apartamento" />
              </label>
              <div className="form-grid">
                <label>
                  Ciudad
                  <input required placeholder="Bogotá" />
                </label>
                <label>
                  Departamento
                  <input required placeholder="Cundinamarca" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Pago</legend>
              <div className="demo-payment">
                <LockKeyhole size={18} />
                <div>
                  <strong>Pago seguro en modo demo</strong>
                  <span>Conectaremos Wompi, Mercado Pago o PayU mediante su SDK oficial.</span>
                </div>
              </div>
            </fieldset>
            <button className="button button-primary button-wide" type="submit">
              Confirmar pedido demo <ArrowRight size={16} />
            </button>
          </form>
          <aside className="summary-panel checkout-summary">
            <h3>Tu pedido</h3>
            {cart.map((item) => (
              <div className="checkout-product" key={item.id}>
                <img src={item.images[0]} alt="" />
                <span>
                  {item.name} <small>× {item.quantity}</small>
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal + shipping)}</strong>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}
