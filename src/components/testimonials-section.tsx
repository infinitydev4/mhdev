/* eslint-disable react/no-unescaped-entities */

'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from "@/lib/utils"
import Marquee from './ui/marquee'

const testimonials = [
  {
    id: 1,
    location: 'FRANCE PARIS',
    category: 'website',
    stars: 5,
    text: '"Mohamed est rapide et très communicatif. Il a donné d\'excellents conseils sur l\'amélioration des performances de notre site avec une excellente contribution en matière de design. Son utilisation de Figma a été recommandée pour que la phase de mise en œuvre se déroule en douceur. Garanti que vous serez impressionné si vous l\'utilisez !"'
  },
  {
    id: 2,
    location: 'FRANCE LYON',
    category: 'seo',
    stars: 5,
    text: '"Wow ! Ce gars a du talent et de la patience et connaît son métier. Il est tout simplement incroyable. C\'est fou de dire à tout le monde ici à quel point il est bon, parce que dans un moment, il sera tellement occupé qu\'on ne pourra plus faire appel à lui ! Vous savez, c\'est ce genre de qualité ! Avec tout mon respect, je suis reconnaissant de l\'avoir trouvé."'
  },
  {
    id: 3,
    location: 'FRANCE MARSEILLE',
    category: 'landing page',
    stars: 5,
    text: '"Mohamed est un excellent communicateur, très professionnel, a effectué le travail très rapidement et a apporté son expertise aux landing pages pour travailler avec moi et le texte que j\'avais écrit. Ma landing page est superbe et j\'étais ravi du travail que Mohamed a fait. Je l\'ai déjà recommandé à un ami."'
  },
  {
    id: 4,
    location: 'FRANCE BORDEAUX',
    category: 'website',
    stars: 5,
    text: '"Très bon développeur avec un excellent œil pour le design. A la capacité de faire des choses from scratch qui ne peuvent pas être faites avec des thèmes. Facile à travailler avec et toujours disponible pour les réunions en France."'
  }
]

const firstRow = testimonials.slice(0, testimonials.length / 2)
const secondRow = testimonials.slice(testimonials.length / 2)

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <figure className={cn(
      "relative w-[400px] mx-4 overflow-hidden rounded-lg backdrop-blur-lg p-6",
      "bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
    )}>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(testimonial.stars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#C1FF00] text-[#C1FF00]" />
        ))}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-white">{testimonial.location}</h3>
        <span className="text-sm text-gray-400">{testimonial.category}</span>
      </div>
      <blockquote className="text-gray-300 text-sm leading-relaxed">
        {testimonial.text}
      </blockquote>
    </figure>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="temoignages" className="relative bg-black py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="mb-16 text-center"
        >
          <span className="font-protest text-[#8364FF] text-4xl block -mb-5 relative z-10">VOICI MES</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">AVIS</span>
        </motion.h2>

        <div className="relative h-[600px] overflow-hidden">
          {/* Premier rang de témoignages */}
          <Marquee pauseOnHover className="[--duration:40s] mb-8">
            {firstRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Deuxième rang de témoignages (direction inverse) */}
          <Marquee reverse pauseOnHover className="[--duration:40s]">
            {secondRow.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Effets de dégradé sur les côtés */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black" />

          {/* Bouton central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 100 100">
                <path
                  id="textCircle"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                  className="text-[#FF8656]"
                />
                <text className="text-[9px] uppercase fill-[#FF8656] font-protest tracking-[0.25em]">
                  <textPath href="#textCircle" startOffset="0%">
                    • CLICK HERE • CLICK HERE • CLICK HERE •
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-[#FF8656] bg-black text-[#FF8656] transition-colors group-hover:bg-[#FF8656] group-hover:text-white">
                  <MousePointerClick className="w-6 h-6 mb-1" />
                  <span className="text-xs font-protest">VOIR PLUS</span>
                  <span className="text-xs font-protest">D'AVIS</span>
                </div>
              </div>
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

