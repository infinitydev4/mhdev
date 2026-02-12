'use client'

import { motion } from 'framer-motion'
import { Linkedin, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import HyperText from "./ui/hyper-text"

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const contactButtons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A9veloppeur-web-freelance/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Phone, href: 'tel:+33767036848', label: 'Téléphone', color: '#C1FF00' },
    { icon: MessageCircle, href: 'https://wa.me/33767036848', label: 'WhatsApp', color: '#25D366' },
  ]

  return (
    <section className="container bg-black rounded-b-[40px] mx-auto px-8 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter relative"
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-protest text-[#8364FF] block -mb-3 sm:-mb-5 relative z-10"
            >
              MOHAMED
            </motion.span>
            <HyperText 
              text="DÉVELOPPEUR #"
              className="font-archivo text-[#C1FF00] font-black block relative z-0"
              duration={1000}
              framerProps={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                viewport: { once: true }
              }}
            />
            <HyperText 
              text="ROR FULLSTACK"
              className="font-archivo text-[#C1FF00] font-black block relative z-0 text-3xl sm:text-3xl md:text-6xl"
              duration={1000}
              framerProps={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.5 },
                viewport: { once: true }
              }}
            />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300"
          >
            Architecture SaaS • API-first • Performance • Scalabilité
          </motion.p>
        </div>

        <motion.ul 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {[
            {
              title: "Architecture SaaS Rails (API, multi-tenant)",
              subtitle: "PostgreSQL, optimisation & performance, Sidekiq & Redis"
            },
            {
              title: "Frontend React et Next.js",
              subtitle: "TypeScript, TailwindCSS, interfaces modernes et responsive"
            },
            {
              title: "DevOps & CI/CD",
              subtitle: "Docker, Kubernetes, pipelines automatisés, monitoring"
            }
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-[#C1FF00] text-xl">✓</span>
              <p>
                <span className="font-protest font-bold">{item.title}</span>
                <br />
                <span className="text-gray-400">{item.subtitle}</span>
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative w-full aspect-square">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/images/mhdev-loop.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative">
          {/* Bouton principal CONTACTEZ MOI */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              type: "spring",
              stiffness: 200
            }}
            viewport={{ once: true }}
            className="absolute right-24 sm:-right-4 md:-right-20 -top-24 md:-top-36"
          >
            <button 
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-full bg-[#FF8656] blur-sm opacity-50 transition-all group-hover:opacity-75 group-hover:blur-md" />
              <div className="relative flex flex-col items-center justify-center w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-[#FF8656] bg-black text-[#FF8656] transition-all group-hover:text-white group-hover:scale-110">
                <span className="font-archivo font-black text-[9px] sm:text-[10px] leading-tight">CONTACTEZ</span>
                <span className="font-archivo font-black text-[9px] sm:text-[10px] leading-tight">MOI</span>
              </div>
            </button>
          </motion.div>

          {/* Bulles de contact */}
          {isContactOpen && contactButtons.map((button, index) => {
            const Icon = button.icon
            const angle = (index - 1) * 60 - 90
            const radius = 70
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <motion.a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, x, y }}
                exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className="absolute right-28 sm:-right-4 md:-right-14 -top-[120px] md:-top-36 group"
                style={{ zIndex: 5 }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 rounded-full blur-sm opacity-50 transition-all group-hover:opacity-75 group-hover:blur-md" 
                    style={{ backgroundColor: button.color }}
                  />
                  <div 
                    className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 bg-black transition-all group-hover:scale-110"
                    style={{ borderColor: button.color, color: button.color }}
                  >
                    <Icon size={20} className="group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
} 