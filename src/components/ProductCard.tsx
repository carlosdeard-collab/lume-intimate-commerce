import { ArrowUpRight, Heart, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, imageFallback } from '../config'
import { useStore } from '../context/StoreContext'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, favorites, toggleFavorite } = useStore()
  const isFavorite = favorites.includes(product.id)
  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0
  return <article className="product-card">
    <div className="product-image-wrap"><Link to={`/producto/${product.slug}`}><img src={product.images[0]} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = imageFallback }} /><img className="product-image-alt" src={product.images[1]} alt="" loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = imageFallback }} /></Link><div className="product-tags">{product.tags.slice(0, 1).map((tag) => <span key={tag}>{tag}</span>)}</div><button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => addToCart(product)}><ShoppingBag size={16} /> Añadir</button></div>
    <div className="product-info"><div><span className="product-category">{product.category}</span><Link to={`/producto/${product.slug}`} className="product-name">{product.name}</Link></div><div className="product-rating"><Star size={13} fill="currentColor" /> {product.rating}</div><div className="product-price">{formatPrice(product.price)} {product.comparePrice && <del>{formatPrice(product.comparePrice)}</del>}{discount > 0 && <em>-{discount}%</em>}</div><Link className="product-arrow" to={`/producto/${product.slug}`} aria-label={`Ver ${product.name}`}><ArrowUpRight size={18} /></Link></div>
  </article>
}
