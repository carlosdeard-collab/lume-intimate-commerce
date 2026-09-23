import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/products'

export default function Categories() {
  return (
    <main className="categories-page">
      <div className="page-intro">
        <span className="eyebrow">Explora por intención</span>
        <h1>Encuentra tu <i>ritual.</i></h1>
        <p>Elige una categoría y descubre piezas seleccionadas para acompañar tu ritmo.</p>
      </div>
      <section className="categories-directory" aria-label="Categorías de productos">
        {categories.map((category, index) => (
          <Link className={`category-card category-${index}`} to={`/categoria/${category.name.toLowerCase()}`} key={category.name}>
            <img src={category.image} alt="" loading="lazy" />
            <div><span>{category.label}</span><h2>{category.name}</h2></div>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </section>
    </main>
  )
}
