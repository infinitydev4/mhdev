'use client'

/* eslint-disable react/no-unescaped-entities */

import { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Code2, Database, Cloud, Users } from 'lucide-react'
import { Terminal, TypingAnimation, AnimatedSpan } from './ui/terminal'

// Type pour les icônes
type TimelineItemProps = {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  isLast?: boolean
}

const TimelineItem: FC<TimelineItemProps> = ({ year, title, description, icon, isLast }) => (
  <div className="relative flex-1 min-w-0">
    {!isLast && (
      <div className="absolute hidden xl:block top-4 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px border-t-2 border-dashed border-[#8364FF]/30" />
    )}
    {!isLast && (
      <div className="absolute xl:hidden left-4 top-4 h-[calc(100%+2rem)] w-px border-l-2 border-dashed border-[#8364FF]/30" />
    )}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex items-center gap-3 xl:flex-col xl:items-start"
    >
      <div className="relative h-8 w-8 xl:mx-auto">
        {/* Carré violet externe */}
        <div className="absolute inset-0 rounded bg-[#8364FF]" />
        {/* Carré jaune interne avec l'icône */}
        <div className="absolute inset-[4px] rounded-sm bg-[#C1FF00] flex items-center justify-center">
          <div className="text-[#8364FF]">
            {icon}
          </div>
        </div>
      </div>
      <div className="rounded-lg border-2 border-dashed border-[#8364FF] bg-black/50 p-4 xl:w-full xl:mt-4 h-full">
        <div className="font-archivo text-xl font-bold text-[#C1FF00]">{year}</div>
        <div className="font-protest font-medium text-white">{title}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </motion.div>
  </div>
)

export default function AboutSection() {
  return (
    <section id="apropos" className="relative bg-black py-12">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center relative"
        >
          <span className="font-protest text-[#8364FF] text-6xl block -mb-5 relative z-10">Somthing</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">ABOUT ME</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16"
        >
          {/* Colonne gauche */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-protest text-2xl font-bold text-[#C1FF00]">
              MOHAMED OULLAMI
            </h3>
            <div className="flex gap-4">
              <div>
                <div className="font-protest text-4xl font-bold text-[#8364FF]">7+</div>
                <div className="font-protest text-xl font-bold text-[#C1FF00]">ANNÉES</div>
              </div>
              <div>
                <div className="font-protest text-4xl font-bold text-[#8364FF]">50+</div>
                <div className="font-protest text-xl font-bold text-[#C1FF00]">PROJETS</div>
              </div>
            </div>
            <p className="text-gray-400">
              Lead Developer Ruby on Rails avec 7+ ans d&apos;expérience en architecture SaaS et solutions 
              scalables. J&apos;intègre l&apos;IA dans mon workflow pour maximiser la productivité tout en 
              gardant la responsabilité architecturale et la validation du code.
            </p>
            <div className="flex gap-4">
              <div>
                <div className="font-protest text-2xl font-bold text-[#8364FF]">TDD</div>
                <div className="font-protest text-sm font-bold text-[#C1FF00]">CLEAN CODE</div>
              </div>
              <div>
                <div className="font-protest text-2xl font-bold text-[#8364FF]">CI/CD</div>
                <div className="font-protest text-sm font-bold text-[#C1FF00]">DEVOPS</div>
              </div>
            </div>
          </motion.div>

          {/* Image centrale */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative aspect-square"
          >
            <Image
              src="/images/mohamed.gif"
              alt="Mohamed - Développeur Fullstack Ruby on Rails"
              fill
              className="object-contain"
              priority
              quality={90}
            />
            <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8656]">
              <Code2 size={24} className="text-white" />
            </div>
          </motion.div>

          {/* Colonne droite - Terminal animé */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400"
          >
            <Terminal className="max-w-full max-h-[500px] border-[#8364FF]/50 bg-black/80">
              <TypingAnimation className="text-[#C1FF00] font-bold text-sm" duration={40}>
                $ cat expertise.md
              </TypingAnimation>

              <AnimatedSpan className="text-[#C1FF00] font-bold text-sm mt-2">
                &gt; Lead Developer Ruby on Rails
              </AnimatedSpan>

              <AnimatedSpan className="text-gray-300 text-xs mt-1">
                Architecture SaaS &amp; API-first
              </AnimatedSpan>
              <AnimatedSpan className="text-gray-300 text-xs">
                TDD, Clean Code &amp; SOLID
              </AnimatedSpan>
              <AnimatedSpan className="text-gray-300 text-xs">
                CI/CD &amp; DevOps moderne
              </AnimatedSpan>

              <TypingAnimation className="text-[#8364FF] font-bold text-sm mt-3" duration={40}>
                $ cat workflow-ia.md
              </TypingAnimation>

              <AnimatedSpan className="text-[#C1FF00] font-bold text-sm mt-2">
                &gt; Développement augmenté par l&apos;IA
              </AnimatedSpan>

              <AnimatedSpan className="text-gray-300 text-xs mt-1">
                Productivité maximisée
              </AnimatedSpan>
              <AnimatedSpan className="text-gray-300 text-xs">
                Validation humaine garantie
              </AnimatedSpan>
              <AnimatedSpan className="text-gray-300 text-xs">
                Responsabilité architecturale
              </AnimatedSpan>

              <TypingAnimation className="text-green-400 text-xs mt-3" duration={30}>
                ✔ Workflow optimisé chargé avec succès.
              </TypingAnimation>
            </Terminal>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col xl:flex-row gap-8"
        >
          <TimelineItem
            year="2017-2019"
            title="ASSYS - ESN"
            description="Développeur Fullstack Ruby on Rails / React-Next.js en ESN."
            icon={<Code2 size={14} />}
          />
          <TimelineItem
            year="2018-2026"
            title="WebConcepter"
            description="Freelance - Architecture SaaS Rails, PostgreSQL, Sidekiq & Redis."
            icon={<Database size={14} />}
          />
          <TimelineItem
            year="2019-2021"
            title="Steeple"
            description="Développement plateforme communication interne multi-supports."
            icon={<Cloud size={14} />}
          />
          <TimelineItem
            year="2024-2025"
            title="Digital College"
            description="Formateur Web Fullstack - Ruby on Rails, React.js, TDD et CI/CD."
            icon={<Users size={14} />}
            isLast
          />
        </motion.div>
      </div>
    </section>
  )
}

