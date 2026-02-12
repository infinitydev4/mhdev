'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function GoogleTagManager() {
  const GTM_ID = 'GTM-PXMQVNC5'
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Delay GTM loading until after initial render and user interaction
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 3000) // Load after 3 seconds

    // Or load on first user interaction
    const handleInteraction = () => {
      setShouldLoad(true)
      clearTimeout(timer)
    }

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true })
    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  )
}
