import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import HackerBackground from "@/components/ui/hackerbg";

const protestRevolution = localFont({
  src: './fonts/ProtestRevolution-Regular.ttf',
  display: 'swap',
  variable: '--font-protest-revolution',
})

const archivoBlack = localFont({
  src: './fonts/ArchivoBlack-Regular.ttf',
  display: 'swap',
  variable: '--font-archivo-black',
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
    'développeur web', 'fullstack developer', 'ruby on rails developer',
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
    'Ruby on Rails', 'React', 'Next.js', 'TypeScript', 'PostgreSQL',
    'Docker', 'Kubernetes', 'CI/CD', 'TDD', 'Architecture SaaS',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${protestRevolution.variable} ${archivoBlack.variable}`}>
      <body className="relative bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HackerBackground color="#8364FF" fontSize={8} speed={1} className="opacity-1 bg-transparent" />
        {children}
      </body>
    </html>
  );
}
