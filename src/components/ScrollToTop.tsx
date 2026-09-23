import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollToTop() {
  const { key, pathname } = useLocation()
  const navigationType = useNavigationType()
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const collectionRoute = pathname === '/catalogo' || pathname.startsWith('/categoria/')
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    const restoreScroll = () => {
      const savedPosition = collectionRoute ? sessionStorage.getItem('lume-collection-scroll') : null
      if (savedPosition) window.scrollTo({ top: Number(savedPosition), left: 0, behavior: 'auto' })
    }
    if (navigationType === 'POP' && collectionRoute) {
      const frame = window.requestAnimationFrame(restoreScroll)
      const timer = window.setTimeout(restoreScroll, 160)
      const lateTimer = window.setTimeout(restoreScroll, 420)
      return () => {
        window.cancelAnimationFrame(frame)
        window.clearTimeout(timer)
        window.clearTimeout(lateTimer)
      }
    }
    resetScroll()
    const frame = window.requestAnimationFrame(resetScroll)
    const timer = window.setTimeout(resetScroll, 80)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [key, navigationType, pathname])
  return null
}
