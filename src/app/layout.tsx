import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import HackerBackground from "@/components/ui/hackerbg";
import GoogleTagManager from "@/components/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/GoogleTagManagerNoScript";

const protestRevolution = localFont({
  src: './fonts/ProtestRevolution-Regular.ttf',
  display: 'swap',
  variable: '--font-protest-revolution',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

const archivoBlack = localFont({
  src: './fonts/ArchivoBlack-Regular.ttf',
  display: 'swap',
  variable: '--font-archivo-black',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'Mohamed Oullami | Développeur Fullstack Ruby on Rails',
    template: '%s | Mohamed Oullami',
  },
  description: 'Développeur Fullstack Ruby on Rails confirmé avec 7+ ans d\'expérience. Architecture SaaS, API-first, PostgreSQL, React, Next.js, Docker, CI/CD. Basé à Nantes.',
  keywords: [
    'développeur fullstack', 'ruby on rails', 'react', 'next.js', 'typescript',
    'postgresql', 'docker', 'kubernetes', 'saas', 'api', 'nantes', 'freelance',
    'développeur web', 'fullstack developer', 'ruby on rails developer', 'react developer', 
    'next.js developer', 'typescript developer', 'postgresql developer', 'docker developer', 
    'kubernetes developer', 'saas developer', 'api developer', 'nantes developer', 'freelance developer', 
    'web developer', 'fullstack developer', 'ruby on rails developer', 'react developer', 
    'next.js developer', 'typescript developer', 'postgresql developer', 'docker developer', 
    'kubernetes developer', 'saas developer', 'api developer', 'nantes developer', 'freelance developer',
    
  ],
  authors: [{ name: 'Mohamed Oullami' }],
  creator: 'Mohamed Oullami',
  metadataBase: new URL('https://www.mhdev.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.mhdev.xyz',
    siteName: 'MohDev - Mohamed Oullami',
    title: 'Mohamed Oullami | Développeur Fullstack Ruby on Rails',
    description: 'Développeur Fullstack Ruby on Rails confirmé. Architecture SaaS, API-first, React, Next.js, Docker, CI/CD.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Oullami | Développeur Fullstack Ruby on Rails',
    description: 'Développeur Fullstack Ruby on Rails confirmé. Architecture SaaS, API-first, React, Next.js.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohamed Oullami',
  jobTitle: 'Développeur Fullstack Ruby on Rails',
  url: 'https://www.mhdev.xyz',
  sameAs: ['https://github.com/homdev'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nantes',
    addressCountry: 'FR',
  },
  knowsAbout: [
    'Développeur Fullstack', 'Développeur Ruby on Rails', 'Développeur react', 'Développeur next.js', 
    'Développeur typescript', 'Développeur postgresql', 'Développeur docker', 'Développeur kubernetes', 
    'Développeur ci/cd', 'Développeur tdd', 'Développeur architecture saas', 'Développeur redis', 
    'Développeur sidekiq', 'Développeur nest.js', 'Développeur node.js', 'Développeur html', 'Développeur css',
    'Développeur tailwindcss', 'Développeur javascript', 'Développeur typescript', 'Développeur postgresql', 'Développeur docker', 'Développeur kubernetes', 
    'Freelance', 'Freelance web', 'Freelance web development', 'Freelance web design', 'Freelance web development', 'Freelance web design',
    'Développeur ci/cd', 'Développeur tdd', 'Développeur architecture saas', 'Développeur redis', 
    'Développeur sidekiq', 'Développeur nest.js', 'Développeur node.js', 'Développeur html', 'Développeur css',
    'Développeur tailwindcss', 'Développeur javascript', 'Développeur typescript', 'Développeur postgresql', 'Développeur docker', 'Développeur kubernetes', 
    'Développeur ci/cd', 'Développeur tdd', 'Développeur architecture saas', 'Développeur redis', 
    'Développeur sidekiq', 'Développeur nest.js', 'Développeur node.js', 'Développeur html', 'Développeur css',
    'Lead Developer','Ruby on Rails', 'React', 'Next.js', 'TypeScript', 'PostgreSQL',
    'Docker', 'Kubernetes', 'CI/CD', 'TDD', 'Architecture SaaS', 
    'PostgreSQL', 'Redis', 'Sidekiq', 'Nest.js', 'Node.js'
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${protestRevolution.variable} ${archivoBlack.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="relative bg-black" suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HackerBackground color="#8364FF" fontSize={4} speed={0.5} className="opacity-1 bg-transparent" />
        {children}
        <GoogleTagManager />
      </body>
    </html>
  );
}
