import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { siteConfig } from '../config'
import { useStore } from '../context/StoreContext'
import { useState } from 'react'

export function Header() {
  const { cartCount, favorites } = useStore()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const links = [['Colección', '/catalogo'], ['Categorías', '/categoria/estimulación'], ['Nuestra historia', '/nosotros'], ['Ayuda', '/faq']]
  return <>
    <header className="site-header">
      <button className="icon-button menu-trigger" aria-label="Abrir menú" onClick={() => setOpen(true)}><Menu size={21} /></button>
      <Link className="brand" to="/">{siteConfig.brand}<span>.</span></Link>
      <nav className="desktop-nav">{links.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Buscar" onClick={() => navigate('/catalogo')}><Search size={19} /></button>
        <button className="icon-button favorite-action" aria-label="Favoritos" onClick={() => navigate('/catalogo')}><Heart size={19} /><small>{favorites.length}</small></button>
        <button className="icon-button bag-action" aria-label="Carrito" onClick={() => navigate('/carrito')}><ShoppingBag size={20} /><small>{cartCount}</small></button>
        <button className="icon-button account-trigger" aria-label="Cuenta"><UserRound size={19} /></button>
      </div>
    </header>
    {open && <div className="mobile-menu"><div className="mobile-menu-top"><span className="eyebrow">Menú</span><button className="icon-button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={21} /></button></div>{links.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}<div className="mobile-menu-foot">Compra discreta · Empaque cuidado</div></div>}
  </>
}
