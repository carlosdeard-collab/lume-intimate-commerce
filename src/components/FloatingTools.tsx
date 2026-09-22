import { Bot, MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getChatReply } from '../services/chatService'
import type { ChatMessage } from '../types'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import { imageFallback, whatsappLink } from '../config'

function ImageFallbackGuard() {
  useEffect(() => {
    const handleImageError = (event: Event) => {
      const image = event.target
      if (!(image instanceof HTMLImageElement) || image.src === imageFallback) return
      image.onerror = null
      image.src = imageFallback
    }
    window.addEventListener('error', handleImageError, true)
    return () => window.removeEventListener('error', handleImageError, true)
  }, [])
  return null
}

export function FloatingTools() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([{ text: 'Hola, soy Lume. Puedo ayudarte a encontrar algo que se sienta muy tú.', role: 'bot' }])
  const [input, setInput] = useState('')
  const send = async (message = input) => {
    if (!message.trim()) return
    setMessages((current) => [...current, { text: message, role: 'user' }])
    setInput('')
    const reply = await getChatReply(message)
    setMessages((current) => [...current, reply])
  }
  return <><ImageFallbackGuard />
    <a className="whatsapp-float" href={whatsappLink('Hola, estoy interesado en conocer más sobre sus productos.')} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp"><MessageCircle size={22} /></a>
    <button className={`chat-float ${chatOpen ? 'active' : ''}`} onClick={() => setChatOpen(!chatOpen)} aria-label={chatOpen ? 'Cerrar asistente' : 'Abrir asistente'}>{chatOpen ? <X size={20} /> : <Bot size={21} />}</button>
    {chatOpen && <aside className="chat-window"><div className="chat-head"><div><span className="status-dot" /> Lume assistant<p>Responde con el catálogo disponible</p></div><button onClick={() => setChatOpen(false)} aria-label="Cerrar"><X size={18} /></button></div><div className="chat-messages">{messages.map((message, index) => message.productIds ? <div className="chat-message bot" key={index}>{message.text}<div className="chat-products">{message.productIds.map((id) => { const product = products.find((item) => item.id === id); return product ? <Link to={`/producto/${product.slug}`} key={id} onClick={() => setChatOpen(false)}>{product.name} ↗</Link> : null })}</div></div> : <div className={`chat-message ${message.role}`} key={index}>{message.text}</div>)}</div><div className="quick-prompts"><button onClick={() => send('Busco algo para usar en pareja')}>Para pareja</button><button onClick={() => send('Quiero algo económico')}>Más accesible</button><button onClick={() => send('Busco algo de masaje')}>Masaje</button></div><form className="chat-input" onSubmit={(event) => { event.preventDefault(); void send() }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu pregunta" aria-label="Pregunta para el asistente" /><button aria-label="Enviar"><Send size={16} /></button></form></aside>}
  </>
}
