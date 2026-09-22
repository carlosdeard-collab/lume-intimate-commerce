import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { whatsappLink } from '../config'

export default function InfoPage({ title, eyebrow, text }: { title: string; eyebrow: string; text: string }) {
  useEffect(() => {
    document.title = `${eyebrow} — Lume`
  }, [eyebrow])

  return (
    <main className="info-page">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <a
        className="button button-primary"
        href={whatsappLink('Hola, quisiera conocer más sobre Lume.')}
        target="_blank"
        rel="noreferrer"
      >
        Escríbenos <ArrowRight size={16} />
      </a>
    </main>
  )
}
