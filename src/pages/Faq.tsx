import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Faq() {
  const faqs = [
    '¿El empaque es discreto?',
    '¿Cuánto tarda el envío?',
    '¿Puedo cambiar o devolver un producto?',
    '¿Cómo se protege mi información?',
  ]
  const [open, setOpen] = useState(0)

  useEffect(() => {
    document.title = 'Preguntas frecuentes — Lume'
  }, [])

  return (
    <main className="faq-page">
      <span className="eyebrow">Resolvemos lo esencial</span>
      <h1>
        Preguntas<br />
        <i>frecuentes.</i>
      </h1>
      <div className="faq-list">
        {faqs.map((question, index) => (
          <div className="faq-item" key={question}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              {question}
              {open === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {open === index && (
              <p>
                {index === 0
                  ? 'Sí. Tu pedido viaja en un empaque neutro, sin referencias al contenido.'
                  : index === 1
                  ? 'Enviamos a ciudades principales de Colombia. Los tiempos y costos se confirman en checkout.'
                  : index === 2
                  ? 'Escríbenos para revisar tu caso según el estado del pedido y la naturaleza del producto.'
                  : 'Usamos tu información únicamente para gestionar la compra y la entrega, siguiendo nuestra política de privacidad.'}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
