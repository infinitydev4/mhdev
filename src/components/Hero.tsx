'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import HyperText from "./ui/hyper-text"

export default function Hero() {
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
            className="text-4xl md:text-6xl font-bold tracking-tighter relative"
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-protest text-[#8364FF] block -mb-5 relative z-10"
            >
              MOHAMED
            </motion.span>
            <HyperText 
              text="DÉVELOPPEUR"
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
              className="font-archivo text-[#C1FF00] font-black block relative z-0"
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
          <Image
            src="/images/moh-hero.png"
            alt="Mohamed - Développeur Fullstack"
            fill
            className="object-contain"
            priority
          />
        </div>

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
          className="absolute -right-4 top-1/2 -translate-y-1/2"
        >
          <button className="relative group">
            <div className="absolute inset-0 rounded-full bg-[#FF8656] transition-transform group-hover:scale-110" />
            <div className="relative flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-[#FF8656] bg-black text-[#FF8656] transition-colors group-hover:text-white">
              <span className="font-medium">CONTACTEZ</span>
              <span className="font-medium">MOI</span>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
} 