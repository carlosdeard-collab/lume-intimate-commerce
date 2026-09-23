import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { siteConfig } from '../config'
import { useStore } from '../context/StoreContext'
import { useEffect, useRef, useState } from 'react'

export function Header() {
  const { cartCount, favorites } = useStore()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const links = [['Colección', '/catalogo'], ['Categorías', '/categorias'], ['Nuestra historia', '/nosotros'], ['Ayuda', '/faq']]

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab' || !menuRef.current) return
      const focusable = menuRef.current.querySelectorAll<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKeyDown) }
  }, [open])

  return <>
    <header className="site-header">
      <button className="icon-button menu-trigger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={21} /></button>
      <Link className="brand" to="/">{siteConfig.brand}<span>.</span></Link>
      <nav className="desktop-nav">{links.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Buscar" onClick={() => navigate('/catalogo')}><Search size={19} /></button>
        <button className="icon-button favorite-action" aria-label="Favoritos" onClick={() => navigate('/catalogo')}><Heart size={19} /><small>{favorites.length}</small></button>
        <button className="icon-button bag-action" aria-label="Carrito" onClick={() => navigate('/carrito')}><ShoppingBag size={20} /><small>{cartCount}</small></button>
        <button className="icon-button account-trigger" aria-label="Cuenta"><UserRound size={19} /></button>
      </div>
    </header>
    {open && <div className="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menú de navegación"><div className="mobile-menu-top"><span className="eyebrow">Menú</span><button className="icon-button" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X size={21} /></button></div>{links.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}<span>↗</span></Link>)}<div className="mobile-menu-foot">Compra discreta · Empaque cuidado</div></div>}
  </>
}
