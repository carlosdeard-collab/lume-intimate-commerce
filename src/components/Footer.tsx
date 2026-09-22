import { Link } from 'react-router-dom'
import { siteConfig } from '../config'

export function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link className="brand" to="/">
            {siteConfig.brand}
            <span>.</span>
          </Link>
          <p>
            Intimidad a tu manera.<br />
            Diseño para sentirte bien.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span className="eyebrow">Explora</span>
            <Link to="/catalogo">Colección</Link>
            <Link to="/categoria/masaje">Masaje</Link>
            <Link to="/categoria/lencería">Lencería</Link>
          </div>
          <div>
            <span className="eyebrow">Lume</span>
            <Link to="/nosotros">Nuestra historia</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/faq">Preguntas frecuentes</Link>
          </div>
          <div>
            <span className="eyebrow">Legal</span>
            <Link to="/politica-privacidad">Privacidad</Link>
            <Link to="/terminos">Términos</Link>
            <span className="socials">
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer">IG</a>
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer">FB</a>
              <a href={siteConfig.tiktok} target="_blank" rel="noreferrer">TK</a>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lume Studio</span>
        <span>Pago demo · Wompi / PayU listos para integrar</span>
        <span>Hecho para sentir</span>
      </div>
    </footer>
  )
}
