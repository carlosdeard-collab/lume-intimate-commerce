import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import { formatPrice, whatsappLink } from '../config'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug) || products[0]
  const { addToCart } = useStore()
  const [imageIndex, setImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${product.name} — Lume`
  }, [product.name])

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1
      if (a.category !== product.category && b.category === product.category) return 1
      return 0
    })
    .slice(0, 4)

  return (
    <main className="product-page">
      <div className="breadcrumbs">
        <Link to="/catalogo">Colección</Link>
        <span>/</span>
        {product.name}
      </div>
      <div className="product-detail">
        <div className="product-gallery">
          <div className="gallery-main">
            <img src={product.images[imageIndex]} alt={product.name} />
          </div>
          <div className="gallery-thumbs">
            {product.images.map((image, index) => (
              <button className={imageIndex === index ? 'active' : ''} onClick={() => setImageIndex(index)} key={image}>
                <img src={image} alt={`${product.name} vista ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="product-detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            ★★★★★ <span>{product.rating} · {product.reviews} reseñas</span>
          </div>
          <div className="detail-price">
            {formatPrice(product.price)}{' '}
            {product.comparePrice && (
              <>
                <del>{formatPrice(product.comparePrice)}</del>
                <em>Oferta especial</em>
              </>
            )}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="stock-line">
            <span className="stock-dot" /> En stock · despacho discreto
          </div>
          <div className="purchase-row">
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Reducir cantidad">
                <Minus size={15} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar cantidad">
                <Plus size={15} />
              </button>
            </div>
            <button
              className="button button-primary button-wide"
              onClick={() => {
                for (let index = 0; index < quantity; index += 1) addToCart(product)
                navigate('/carrito')
              }}
            >
              Agregar al carrito <ShoppingBag size={16} />
            </button>
          </div>
          <a
            className="buy-now"
            href={whatsappLink(`Hola, estoy interesado en el producto ${product.name}. ¿Podrían darme más información?`)}
            target="_blank"
            rel="noreferrer"
          >
            ¿Tienes dudas? Escríbenos por WhatsApp <ArrowUpRight size={15} />
          </a>
          <div className="spec-list">
            {Object.entries(product.specifications).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">También puede gustarte</span>
            <h2>
              Completa el <i>ritual.</i>
            </h2>
          </div>
        </div>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  )
}
