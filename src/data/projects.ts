export type Project = {
  id: number
  title: string
  subtitle: string
  category: 'landing page' | 'website' | 'mobile app' | 'seo'
  image: string
}

export const projects: Project[] = [
    {
      id: 1,
      title: 'TRAIL-ASSISTANCE',
      subtitle: 'PWA ASSISTANCE TRAIL',
      category: 'landing page',
      image: '/images/realisations/35.png'
    },
    {
      id: 2,
      title: 'DOMONO',
      subtitle: 'APPLICATION DOMOTIQUE',
      category: 'mobile app',
      image: '/images/realisations/32.png'
    },
    {
      id: 3,
      title: 'CLEADS',
      subtitle: 'CRM & LEADS MANAGEMENT',
      category: 'website',
      image: '/images/realisations/33.png'
    },
    {
      id: 4,
      title: 'DIRSOUK',
      subtitle: 'MARKETPLACE E-COMMERCE',
      category: 'website',
      image: '/images/realisations/34.png'
    },
    {
      id: 5,
      title: 'ISOLATIONS',
      subtitle: 'TRAVAUX ISOLATIONS BATIMENTS',
      category: 'landing page',
      image: '/images/realisations/48.png'
    },
    {
      id: 6,
      title: 'REENOVE',
      subtitle: 'APPLICATION TRAVAUX BATIMENTS',
      category: 'mobile app',
      image: '/images/realisations/30.png'
    },
    {
      id: 7,
      title: 'DJAZIFY',
    subtitle: 'SAAS PROJECT MANAGEMENT',
      category: 'landing page',
      image: '/images/realisations/49.png'
    },

    {
      id: 8,
      title: 'AZ-CONCEPTION',
      subtitle: 'CUISINISTE',
      category: 'seo',
      image: '/images/realisations/47.png'
    },
  ]
  

export const categories = ['landing page', 'website', 'mobile app', 'seo'] 