import { useEffect, useState, useMemo } from 'react'
import { ArrowRight, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function Catalog() {
  const { category } = useParams()
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')
  const [openFilters, setOpenFilters] = useState(false)

  useEffect(() => {
    document.title = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} — Lume` : 'Colección — Lume'
  }, [category])

  const filtered = useMemo(() => {
    let result = products.filter(
      (product) =>
        (!category || product.category.toLowerCase().includes(category.toLowerCase())) &&
        product.name.toLowerCase().includes(query.toLowerCase())
    )
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [category, query, sort])

  return (
    <main className="catalog-page">
      <div className="page-intro">
        <span className="eyebrow">Colección Lume</span>
        <h1>{category || 'Todo para sentirte bien.'}</h1>
        <p>Diseño, placer y bienestar en piezas escogidas para acompañar tu ritmo.</p>
      </div>
      <div className="catalog-toolbar">
        <div className="search-field">
          <span>Buscar</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre, categoría..." aria-label="Buscar productos" />
        </div>
        <button className="filter-mobile" onClick={() => setOpenFilters(!openFilters)}>
          Filtros {openFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <label className="sort-field">
          Ordenar por{' '}
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Destacados</option>
            <option value="low">Precio menor</option>
            <option value="high">Precio mayor</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </label>
      </div>
      <div className={`catalog-layout ${openFilters ? 'filters-open' : ''}`}>
        <aside className="filter-panel">
          <span className="eyebrow">Filtrar</span>
          <strong>Categorías</strong>
          {['Todo', ...categories.map((item) => item.name)].map((item) => (
            <Link
              className={!category && item === 'Todo' ? 'active' : ''}
              key={item}
              to={item === 'Todo' ? '/catalogo' : `/categoria/${item.toLowerCase()}`}
            >
              {item}
              <span>↗</span>
            </Link>
          ))}
          <div className="filter-note">
            <ShieldCheck size={17} />
            <p>
              Compra privada
              <br />y empaque discreto.
            </p>
          </div>
        </aside>
        <div className="catalog-results">
          <div className="results-count">{filtered.length} piezas seleccionadas</div>
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <h3>No encontramos esa combinación.</h3>
              <Link className="text-link" to="/catalogo">
                Ver toda la colección <ArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
