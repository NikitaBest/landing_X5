import { useCallback, useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import ProcessSection from './ProcessSection'
import FoodImpactSection from './FoodImpactSection'
import HowItWorksSection from './HowItWorksSection'
import SignalsSection from './SignalsSection'
import NutritionistSection from './NutritionistSection'
import FaqSection from './FaqSection'
import FinalCtaSection from './FinalCtaSection'
import FooterSection from './FooterSection'
import ScanModal from './ScanModal'
import { buildScanAppUrl } from './scanAppUrl'
import { getUtmLabelFromLocation, readStoredAuthId, readStoredAuthToken, storeAuthResponse } from './authSession'

const PHONE_MEDIA_QUERY = '(max-width: 767px)'

function isPhoneClient() {
  if (typeof window === 'undefined') {
    return false
  }

  const touchPhoneAgent = /Android.+Mobile|iPhone|iPod|Windows Phone|webOS|BlackBerry/i.test(
    navigator.userAgent,
  )
  const smallScreen = window.matchMedia(PHONE_MEDIA_QUERY).matches

  return touchPhoneAgent || smallScreen
}

function App() {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)

  const handleOpenScanModal = useCallback(() => {
    if (isPhoneClient()) {
      window.location.assign(buildScanAppUrl(readStoredAuthId()))
      return
    }

    setIsScanModalOpen(true)
  }, [])

  const handleOpenScanModalWeb = useCallback(() => {
    if (isPhoneClient()) {
      window.location.assign(buildScanAppUrl(readStoredAuthId()))
      return
    }

    setIsScanModalOpen(true)
  }, [])

  const handleCloseScanModal = useCallback(() => {
    setIsScanModalOpen(false)
  }, [])

  useEffect(() => {
    if (readStoredAuthId()) {
      return
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
    if (!baseUrl) {
      console.error('[auth/login] VITE_API_BASE_URL is empty. Restart dev server after .env changes.')
      return
    }

    let isCancelled = false
    const utmLabel = getUtmLabelFromLocation(window.location.search)

    const loginBySession = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: null, utm: utmLabel }),
        })

        if (!response.ok) {
          console.error('[auth/login] Request failed', response.status, response.statusText)
          return
        }

        const data = (await response.json()) as {
          id?: string
          utm?: string
          token?: string
          user?: { id?: string; profile?: { utmSource?: string } | null } | null
        }
        if (isCancelled) {
          return
        }

        const backendUserId = typeof data.user?.id === 'string' ? data.user.id : data.id
        const backendUtm =
          typeof data.utm === 'string'
            ? data.utm
            : typeof data.user?.profile?.utmSource === 'string'
              ? data.user.profile.utmSource
              : utmLabel

        if (typeof backendUserId === 'string' && backendUserId.length > 0) {
          storeAuthResponse({
            id: backendUserId,
            utm: backendUtm,
            token: typeof data.token === 'string' ? data.token : undefined,
          })
        }
      } catch {
        console.error('[auth/login] Network error while sending request')
      }
    }

    void loginBySession()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
    if (!baseUrl) {
      return
    }

    const startedAt = Date.now()
    const utmLabel = getUtmLabelFromLocation(window.location.search)
    const viewedSections = new Set<string>()

    const getDurationSeconds = () => Math.max(0, Math.floor((Date.now() - startedAt) / 1000))

    const sendStatEvent = (type: string, payload: Record<string, unknown>) => {
      const authToken = readStoredAuthToken()
      if (!authToken) {
        return
      }

      const body = {
        type,
        data: JSON.stringify({
          ...payload,
          path: window.location.pathname,
          utm: utmLabel,
          authId: readStoredAuthId() || null,
        }),
        durationSeconds: getDurationSeconds(),
      }

      void fetch(`${baseUrl}/app/stat-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {
        // Не блокируем UX из-за статистики.
      })
    }

    const openPayload = {
      href: window.location.href,
      referrer: document.referrer || null,
      isPhoneClient: isPhoneClient(),
    }
    sendStatEvent('cjm_landing_open', openPayload)
    const openRetryTimeout = window.setTimeout(() => {
      sendStatEvent('cjm_landing_open', openPayload)
    }, 1200)

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) {
        return
      }

      const interactive = target.closest('button, a') as HTMLElement | null
      if (!interactive) {
        return
      }

      const section = interactive.closest('section[id], header[id], main[id]') as HTMLElement | null
      sendStatEvent('cjm_landing_click', {
        elementTag: interactive.tagName.toLowerCase(),
        elementText: interactive.textContent?.trim() || null,
        sectionId: section?.id || null,
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }
          const sectionId = (entry.target as HTMLElement).id
          if (!sectionId || viewedSections.has(sectionId)) {
            return
          }
          viewedSections.add(sectionId)
          sendStatEvent('cjm_landing_section_view', { sectionId })
        })
      },
      { threshold: 0.45 },
    )

    document.querySelectorAll('section[id], main[id]').forEach((section) => observer.observe(section))
    document.addEventListener('click', onDocumentClick)

    const sendLeaveEvent = (reason: 'visibility_hidden' | 'beforeunload') => {
      const authToken = readStoredAuthToken()
      if (!authToken) {
        return
      }

      const body = {
        type: 'cjm_landing_leave',
        data: JSON.stringify({
          reason,
          path: window.location.pathname,
          utm: utmLabel,
          authId: readStoredAuthId() || null,
        }),
        durationSeconds: getDurationSeconds(),
      }

      void fetch(`${baseUrl}/app/stat-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => {})
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendLeaveEvent('visibility_hidden')
      }
    }
    const onBeforeUnload = () => sendLeaveEvent('beforeunload')

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.clearTimeout(openRetryTimeout)
      observer.disconnect()
      document.removeEventListener('click', onDocumentClick)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (!isScanModalOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsScanModalOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isScanModalOpen])

  return (
    <div className="page">
      <HeroSection onOpenScanModal={handleOpenScanModal} onOpenScanModalWeb={handleOpenScanModalWeb} />
      <ProcessSection />
      <FoodImpactSection />
      <HowItWorksSection />
      <SignalsSection />
      <NutritionistSection />
      <FaqSection />
      <FinalCtaSection onOpenScanModal={handleOpenScanModal} />
      <FooterSection />
      <ScanModal isOpen={isScanModalOpen} onClose={handleCloseScanModal} />
    </div>
  )
}

export default App
