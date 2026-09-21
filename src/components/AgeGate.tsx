import { useEffect, useState } from 'react'

export function AgeGate() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(localStorage.getItem('lume-age-confirmed') !== 'true') }, [])
  if (!visible) return null
  return <div className="age-overlay"><div className="age-card"><span className="eyebrow">Bienvenido a Lume</span><h2>Un espacio para sentirte bien.</h2><p>Este sitio contiene productos destinados exclusivamente para adultos.</p><div className="age-actions"><button className="button button-primary" onClick={() => { localStorage.setItem('lume-age-confirmed', 'true'); setVisible(false) }}>Soy mayor de edad</button><button className="button button-quiet" onClick={() => { window.location.href = 'https://www.google.com' }}>Salir</button></div><small>Al entrar confirmas que tienes la edad legal para acceder a este contenido.</small></div></div>
}
