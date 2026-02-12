'use client'

import { motion } from 'framer-motion'
import { Button3D } from './ui/Button3D'
import { Linkedin, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import HyperText from './ui/hyper-text'

const steps = [
  {
    id: 1,
    title: 'ANALYSE',
    description: 'Analyse des besoins et spécifications techniques',
  },
  {
    id: 2,
    title: 'ARCHITECTURE',
    description: 'Conception de l\'architecture Ruby on Rails',
  },
  {
    id: 3,
    title: 'DÉVELOPPEMENT',
    description: 'Développement avec TDD et bonnes pratiques',
  },
  {
    id: 4,
    title: 'TESTS',
    description: 'Tests unitaires, intégration et performance',
  },
  {
    id: 5,
    title: 'DÉPLOIEMENT',
    description: 'Mise en production et monitoring',
  },
]

const ProcessStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-4">
        {/* Circular step indicator with rotating text */}
        <div className="relative">
          <svg className="w-32 h-32">
            {/* Cercle de base */}
            <circle
              cx="64"
              cy="64"
              r="52"
              className="fill-transparent stroke-[#8364FF] stroke-[0.5]"
            />
            {/* Cercle de progression */}
            <motion.circle
              initial={{ strokeDashoffset: 327 }}
              whileInView={{ strokeDashoffset: 327 - (327 * ((index + 1) * 20)) / 100 }}
              transition={{ 
                duration: 1.5, 
                delay: index * 0.3,
                ease: "easeInOut"
              }}
              cx="64"
              cy="64"
              r="52"
              className="fill-transparent stroke-[#C1FF00] stroke-2"
              strokeDasharray={327}
            />
            {/* Texte circulaire - rayon plus grand (r=60) */}
            <path
              id={`textPath-${step.id}`}
              d="M 64 4 A 60 60 0 1 1 63.999 4"
              fill="none"
              className="text-[#8364FF]"
            />
            <text className="text-[15px] uppercase fill-[#8364FF]">
              <textPath
                href={`#textPath-${step.id}`}
                startOffset="0%"
                className="font-protest tracking-[0.25em]"
              >
                • STEP {step.id} • STEP {step.id} • STEP {step.id} • STEP {step.id} •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sm text-[#C1FF00] font-protest relative group">
              <HyperText
                text={step.title}
                duration={1000}
                className="text-[#C1FF00] font-protest"
                animateOnLoad={false}
              />
              <span className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-[#C1FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
          </div>
        </div>
        
        {/* Step title */}
        {/* <div className="mt-2 text-xl font-bold text-[#C1FF00]">{step.title}</div> */}
      </div>
      
      {/* Step description */}
      <p className="text-sm text-gray-400">{step.description}</p>
    </motion.div>
  )
}

export default function ProcessSection() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const contactButtons = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/d%C3%A9veloppeur-web-freelance/', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Phone, href: 'tel:+33767036848', label: 'Téléphone', color: '#C1FF00' },
    { icon: MessageCircle, href: 'https://wa.me/33767036848', label: 'WhatsApp', color: '#25D366' },
  ]

  return (
    <section id="experience" className="relative bg-black py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-16 text-center text-4xl font-bold"
        >
          <span className="font-protest text-[#8364FF] text-4xl block -mb-5 relative z-10">VOICI MON</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">PROCESS</span>
        </motion.h2>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="mb-16 grid gap-8 md:grid-cols-2 text-center md:text-left"
        >
          <p className="text-gray-400">
            En tant que développeur fullstack Ruby on Rails confirmé, j&apos;applique une méthodologie
            rigoureuse basée sur les meilleures pratiques de l&apos;industrie : Clean Architecture, SOLID,
            TDD et CI/CD.
          </p>
          <p className="text-gray-400">
            Mon expertise technique et mon attention aux détails garantissent des applications
            robustes, scalables et maintenables, conformes aux standards de production des entreprises
            de premier plan.
          </p>
        </motion.div>

        {/* Onboarding Process Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
          className="mb-12 text-center"
        >
          <h3 className="font-archivo text-2xl font-bold text-[#C1FF00]">MÉTHODOLOGIE DE DÉVELOPPEMENT</h3>
          <p className="font-protest mt-2 text-white">Processus en 5 étapes pour garantir la qualité :</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-16">
          {steps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <p className="mb-6 text-gray-400">
            Besoin d&apos;un développeur Ruby on Rails expérimenté ? Discutons de la mission.
          </p>
          
          <div className="relative inline-block">
            <Button3D onClick={() => setIsContactOpen(!isContactOpen)}>
              <span className="font-protest">
                PRENONS CONTACT
              </span>
            </Button3D>

            {/* Bulles de contact en ligne sous le bouton */}
            {isContactOpen && (
              <div className="flex items-center justify-center gap-4 mt-6">
                {contactButtons.map((button, index) => {
                  const Icon = button.icon

                  return (
                    <motion.a
                      key={button.label}
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0, opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className="group"
                    >
                      <div className="relative">
                        <div 
                          className="absolute inset-0 rounded-full blur-sm opacity-50 transition-all group-hover:opacity-75 group-hover:blur-md" 
                          style={{ backgroundColor: button.color }}
                        />
                        <div 
                          className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 bg-black transition-all group-hover:scale-110"
                          style={{ borderColor: button.color, color: button.color }}
                        >
                          <Icon size={24} className="group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

