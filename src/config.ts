export const siteConfig = {
  brand: 'LUME',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '573001234567',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com',
  facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com',
  tiktok: import.meta.env.VITE_TIKTOK_URL || 'https://tiktok.com',
  paymentProvider: import.meta.env.VITE_PAYMENT_PROVIDER || 'demo',
  apiUrl: import.meta.env.VITE_API_URL || '',
}

export const imageFallback = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85'

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
