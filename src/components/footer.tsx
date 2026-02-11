'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black rounded-b-[40px] py-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link href="#about" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              About me
            </Link>
            <Link href="#portfolio" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              Portfolio
            </Link>
            <Link href="#process" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              My process
            </Link>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            {/* Centered logo */}
            <Link href="/" className="font-archivo text-2xl font-bold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              MOHAMED<span className="font-protest text-[#C1FF00]">DEV</span>
            </Link>
          </div>

          {/* Additional Links */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-end">
            <Link href="#packages" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              Packages
            </Link>
            <Link href="#reviews" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              Reviews
            </Link>
            <Link href="#faq" className="font-protest text-gray-400 hover:text-[#C1FF00] transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 