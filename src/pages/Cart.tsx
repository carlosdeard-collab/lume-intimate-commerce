import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight, LockKeyhole } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../config'

export default function Cart() {
  const { cart, subtotal, updateQuantity, removeFromCart } = useStore()
  const shipping = subtotal >= 250000 || subtotal === 0 ? 0 : 14900

  useEffect(() => {
    document.title = 'Carrito — Lume'
  }, [])

  return (
    <main className="cart-page">
      <div className="page-intro compact">
        <span className="eyebrow">Tu selección</span>
        <h1>Carrito.</h1>
      </div>
      {cart.length === 0 ? (
        <div className="empty-state cart-empty">
          <ShoppingBag size={32} />
          <h2>Aún no hay nada aquí.</h2>
          <p>Explora la colección y encuentra algo que te acompañe.</p>
          <Link className="button button-primary" to="/catalogo">
            Explorar colección <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.images[0]} alt={item.name} />
                <div className="cart-item-info">
                  <span className="product-category">{item.category}</span>
                  <Link to={`/producto/${item.slug}`}>{item.name}</Link>
                  <span>{formatPrice(item.price)}</span>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Reducir cantidad">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar cantidad">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.name}`}>
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
          <aside className="summary-panel">
            <h3>Resumen</h3>
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Envío</span>
              <strong>{shipping ? formatPrice(shipping) : 'Gratis'}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal + shipping)}</strong>
            </div>
            <Link className="button button-primary button-wide" to="/checkout">
              Continuar compra <ArrowRight size={16} />
            </Link>
            <small>
              <LockKeyhole size={13} /> Compra privada y segura
            </small>
          </aside>
        </div>
      )}
    </main>
  )
}
