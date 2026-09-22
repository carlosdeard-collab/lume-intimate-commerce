import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'

export default function Favorites() {
  const { favorites } = useStore()
  
  useEffect(() => {
    document.title = 'Favoritos — Lume'
  }, [])

  const favoritedProducts = products.filter((product) => favorites.includes(product.id))

  return (
    <main className="catalog-page">
      <div className="page-intro">
        <span className="eyebrow">Tu selección</span>
        <h1>Tus Favoritos.</h1>
        <p>Piezas guardadas para ti.</p>
      </div>

      {favoritedProducts.length === 0 ? (
        <div className="empty-state cart-empty">
          <Heart size={32} />
          <h2>Aún no tienes favoritos.</h2>
          <p>Guarda los productos que más te gusten para verlos aquí después.</p>
          <Link className="button button-primary" to="/catalogo">
            Explorar colección <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="catalog-results" style={{ width: '100%', marginTop: '2rem' }}>
          <div className="product-grid">
            {favoritedProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
