import { useCallback, useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import ProcessSection from './ProcessSection'
import FoodImpactSection from './FoodImpactSection'
import HowItWorksSection from './HowItWorksSection'
import SignalsSection from './SignalsSection'
import FaqSection from './FaqSection'
import FinalCtaSection from './FinalCtaSection'
import FooterSection from './FooterSection'
import ScanModal from './ScanModal'

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
      return
    }

    setIsScanModalOpen(true)
  }, [])

  const handleCloseScanModal = useCallback(() => {
    setIsScanModalOpen(false)
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
      <HeroSection onOpenScanModal={handleOpenScanModal} />
      <ProcessSection />
      <FoodImpactSection />
      <HowItWorksSection />
      <SignalsSection />
      <FaqSection />
      <FinalCtaSection onOpenScanModal={handleOpenScanModal} />
      <FooterSection />
      <ScanModal isOpen={isScanModalOpen} onClose={handleCloseScanModal} />
    </div>
  )
}

export default App
