'use client'

import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { Button3D } from './ui/Button3D'
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from './ui/accordion'

const faqs = [
  {
    question: "QUELLES SONT VOS COMPÉTENCES PRINCIPALES ?",
    answer: [
      "• Expert Ruby on Rails avec +7 ans d'expérience en développement fullstack",
      "• Maîtrise complète de React, Next.js, TypeScript et Node.js",
      "• Expertise DevOps : Docker, Kubernetes, CI/CD",
      "• Architecture logicielle : Clean Architecture, SOLID, DDD"
    ]
  },
  {
    question: "QUELLES BONNES PRATIQUES APPLIQUEZ-VOUS ?",
    answer: [
      "• TDD (Test-Driven Development) avec RSpec et Jest",
      "• Code Review systématique et pair programming",
      "• CI/CD avec déploiement automatisé",
      "• Documentation technique et API (OpenAPI)",
      "• Sécurité : OWASP Top 10, authentification JWT, validation stricte",
      "• Performance : optimisation des requêtes, caching (Redis), monitoring"
    ]
  },
  {
    question: "QUEL EST VOTRE PROCESSUS DE DÉVELOPPEMENT ?",
    answer: [
      "• Analyse approfondie des besoins et spécifications techniques",
      "• Conception d'architecture scalable et maintenable",
      "• Développement itératif avec tests automatisés",
      "• Code reviews et refactoring continu",
      "• Déploiement progressif avec rollback automatique",
      "• Monitoring et optimisation post-production"
    ]
  },
  {
    question: "POURQUOI CHOISIR UN DÉVELOPPEUR FULLSTACK ?",
    answer: [
      "• Anticipation des problèmes techniques avant qu'ils n'apparaissent",
      "• Code production-ready, robuste et évolutif",
      "• Respect des délais grâce à l'expérience",
      "• Mentorat et transfert de compétences à l'équipe",
      "• Vision stratégique sur l'architecture et la scalabilité"
    ]
  }
]

export default function FAQSection() {
  return (
    <section id="contact" className="relative bg-black py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-16 text-center"
        >
          <span className="font-protest text-[#8364FF] text-4xl block -mb-5 relative z-10">VOICI LA</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">FAQ</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="rounded-lg border border-[#8364FF]/20 bg-[#0A0A0A] overflow-hidden backdrop-blur-sm"
              >
                <AccordionTrigger 
                  className="px-6 py-4 text-[#FF8656] hover:text-[#FF8656]/80 font-archivo flex items-center justify-between"
                >
                  <span className="text-xl">{faq.question}</span>
                  <div className="rounded-full p-2 bg-[#FF8656]/10 transform transition-transform duration-300">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="transform transition-transform duration-300 [&[data-state=open]>svg]:rotate-180"
                    >
                      <path 
                        d="M12 15L17 10H7L12 15Z" 
                        fill="#FF8656"
                      />
                    </svg>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white">
                  {faq.answer.map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bouton CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mt-16 flex justify-center"
        >
          <Button3D>
            <span className="flex items-center gap-2 font-protest">
              DISCUTONS DE VOTRE PROJET
              <MessageSquare size={20} className="inline-block" />
            </span>
          </Button3D>
        </motion.div>
      </div>

      {/* Effets de lumière */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[#8364FF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#C1FF00]/5 blur-[120px] rounded-full" />
      </div> */}
    </section>
  )
} 