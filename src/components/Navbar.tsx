"use client"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsMobileMenuOpen(false)
      }
    }
  }
  return (
    <nav className="mx-auto max-w-7xl fixed top-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-md rounded-full shadow-md shadow-[#8364FF] ">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button (left side) */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-white hover:text-[#C1FF00] transition-colors p-2 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C1FF00]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu (left side) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="#apropos" onClick={(e) => handleAnchorClick(e, '#apropos')} className="font-protest hover:text-[#C1FF00] transition-colors">À propos</Link>
          <Link href="#competences" onClick={(e) => handleAnchorClick(e, '#competences')} className="font-protest hover:text-[#C1FF00] transition-colors">Compétences</Link>
          <Link href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="font-protest hover:text-[#C1FF00] transition-colors">Portfolio</Link>
        </div>

        {/* Centered logo */}
        <Link href="/" className="font-archivo text-2xl font-bold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          MOH<span className="font-protest text-[#C1FF00]">DEV</span>
        </Link>

        {/* Desktop menu (right side) */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="#experience" onClick={(e) => handleAnchorClick(e, '#experience')} className="font-protest hover:text-[#C1FF00] transition-colors">Process</Link>
          <Link href="#temoignages" onClick={(e) => handleAnchorClick(e, '#temoignages')} className="font-protest hover:text-[#C1FF00] transition-colors">Témoignages</Link>
          <Link href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="font-protest hover:text-[#C1FF00] transition-colors">FAQ</Link>
          <Link href="/cv" className="font-protest hover:text-[#C1FF00] transition-colors">CV</Link>
        </div>

        {/* Placeholder for mobile (right side) */}
        <div className="lg:hidden w-6"></div>
      </div>
    </div>

    {/* Mobile menu */}
    <div 
      className={`lg:hidden absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-l shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
      }`}
    >
      <div className="px-4 py-2 space-y-1">
        <Link href="#apropos" onClick={(e) => handleAnchorClick(e, '#apropos')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">À propos</Link>
        <Link href="#competences" onClick={(e) => handleAnchorClick(e, '#competences')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">Compétences</Link>
        <Link href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">Portfolio</Link>
        <Link href="#experience" onClick={(e) => handleAnchorClick(e, '#experience')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">Process</Link>
        <Link href="#temoignages" onClick={(e) => handleAnchorClick(e, '#temoignages')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">Témoignages</Link>
        <Link href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">FAQ</Link>
        <Link href="/cv" className="font-protest block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-[#C1FF00] transition-colors">CV</Link>
      </div>
    </div>
  </nav>
  )
} 