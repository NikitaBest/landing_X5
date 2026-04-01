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
import { getOrCreateSessionId, getScanLinkId, getUtmLabelFromLocation, storeAuthResponse } from './authSession'

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
      window.location.assign(buildScanAppUrl(getScanLinkId()))
      return
    }

    setIsScanModalOpen(true)
  }, [])

  const handleOpenScanModalWeb = useCallback(() => {
    if (isPhoneClient()) {
      window.location.assign(buildScanAppUrl(getScanLinkId()))
      return
    }

    setIsScanModalOpen(true)
  }, [])

  const handleCloseScanModal = useCallback(() => {
    setIsScanModalOpen(false)
  }, [])

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
    if (!baseUrl) {
      console.error('[auth/login] VITE_API_BASE_URL is empty. Restart dev server after .env changes.')
      return
    }

    let isCancelled = false
    const sessionId = getOrCreateSessionId()
    const utmLabel = getUtmLabelFromLocation(window.location.search)

    const loginBySession = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: sessionId, utm: utmLabel }),
        })

        if (!response.ok) {
          console.error('[auth/login] Request failed', response.status, response.statusText)
          return
        }

        const data = (await response.json()) as { id?: string; utm?: string }
        if (isCancelled) {
          return
        }
        if (typeof data.id === 'string') {
          storeAuthResponse({ id: data.id, utm: typeof data.utm === 'string' ? data.utm : '' })
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
