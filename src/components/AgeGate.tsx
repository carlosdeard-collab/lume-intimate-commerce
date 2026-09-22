import { useEffect, useRef, useState } from 'react'

export function AgeGate() {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(localStorage.getItem('lume-age-confirmed') !== 'true')
  }, [])

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.href = 'https://www.google.com'
        return
      }
      if (e.key !== 'Tab' || !cardRef.current) return
      const focusable = cardRef.current.querySelectorAll<HTMLElement>('button, a, input, [tabindex]:not([tabindex="-1"])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Auto-focus first button
    const timer = setTimeout(() => {
      cardRef.current?.querySelector<HTMLElement>('button')?.focus()
    }, 100)
    
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="age-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="age-card" ref={cardRef}>
        <span className="eyebrow">Bienvenido a Lume</span>
        <h2 id="age-gate-title">Un espacio para sentirte bien.</h2>
        <p>Este sitio contiene productos destinados exclusivamente para adultos.</p>
        <div className="age-actions">
          <button
            className="button button-primary"
            onClick={() => {
              localStorage.setItem('lume-age-confirmed', 'true')
              setVisible(false)
            }}
          >
            Soy mayor de edad
          </button>
          <button
            className="button button-quiet"
            onClick={() => { window.location.href = 'https://www.google.com' }}
          >
            Salir
          </button>
        </div>
        <small>Al entrar confirmas que tienes la edad legal para acceder a este contenido.</small>
      </div>
    </div>
  )
}
