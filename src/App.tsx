import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { FloatingTools } from './components/FloatingTools'
import { AgeGate } from './components/AgeGate'
import { ScrollToTop } from './components/ScrollToTop'
import { StoreProvider } from './context/StoreContext'
import InfoPage from './pages/InfoPage'

const Home = lazy(() => import('./pages/Home'))
const Catalog = lazy(() => import('./pages/Catalog'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Faq = lazy(() => import('./pages/Faq'))
const Favorites = lazy(() => import('./pages/Favorites'))

function Shell() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="loading-fallback" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/categoria/:category" element={<Catalog />} />
          <Route path="/producto/:slug" element={<ProductPage />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/contacto" element={<InfoPage title="Hablemos con calma." eyebrow="Contacto" text="Nuestro equipo está aquí para ayudarte a elegir, resolver dudas y acompañarte antes o después de tu compra." />} />
          <Route path="/nosotros" element={<InfoPage title="Diseñamos espacio para sentir." eyebrow="Nuestra historia" text="Lume nace de una idea sencilla: el bienestar íntimo merece el mismo cuidado, diseño y conversación que cualquier otra forma de autocuidado." />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/politica-privacidad" element={<InfoPage title="Tu privacidad importa." eyebrow="Privacidad" text="Usamos tu información únicamente para gestionar la compra y la entrega. Esta sección queda preparada para enlazar la política legal definitiva." />} />
          <Route path="/terminos" element={<InfoPage title="Términos claros." eyebrow="Términos" text="Las condiciones de compra, cambios y devoluciones se publicarán aquí antes de activar pagos reales." />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingTools />
      <AgeGate />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <StoreProvider>
        <Shell />
      </StoreProvider>
    </BrowserRouter>
  )
}
