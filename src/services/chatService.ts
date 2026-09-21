import { products } from '../data/products'

export type ChatReply = { text: string; productIds?: string[] }

export async function getChatReply(message: string): Promise<ChatReply> {
  const normalized = message.toLowerCase()
  if (normalized.includes('pareja') || normalized.includes('compartir')) {
    return { text: 'Claro. Estas opciones están diseñadas para compartir y descubrir juntos.', productIds: products.filter((product) => product.category === 'Juguetes para pareja').map((product) => product.id) }
  }
  if (normalized.includes('económico') || normalized.includes('barato') || normalized.includes('precio')) {
    return { text: 'Te muestro opciones accesibles para comenzar con calma.', productIds: products.filter((product) => product.price < 200000).map((product) => product.id) }
  }
  if (normalized.includes('masaje')) {
    return { text: 'Para un ritual lento y sensorial, mira estas piezas de masaje.', productIds: products.filter((product) => product.category === 'Masaje').map((product) => product.id) }
  }
  return { text: 'Puedo ayudarte a explorar pareja, estimulación, masaje o bienestar íntimo. ¿Qué te gustaría descubrir?' }
}
