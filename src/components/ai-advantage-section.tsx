'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Target, Code, Sparkles } from 'lucide-react'
import { useRef, forwardRef } from 'react'
import { AnimatedBeam } from './ui/animated-beam'
import { cn } from '@/lib/utils'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex items-center justify-center rounded-full border-2 bg-black p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'

const aiAdvantages = [
  {
    icon: Zap,
    title: 'Productivité Augmentée',
    description: 'Utilisation stratégique de l&apos;IA pour accélérer le développement sans compromettre la qualité',
    color: '#C1FF00',
  },
  {
    icon: Code,
    title: 'Suggestions de Refactoring',
    description: 'Exploration rapide de solutions alternatives et optimisations architecturales',
    color: '#8364FF',
  },
  {
    icon: Target,
    title: 'Tests Automatisés',
    description: 'Génération et amélioration de suites de tests pour une couverture optimale',
    color: '#FF8656',
  },
  {
    icon: Sparkles,
    title: 'Apprentissage Continu',
    description: 'Veille technologique accélérée et exploration de nouvelles solutions',
    color: '#C1FF00',
  },
]

export default function AIAdvantageSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const brainRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)

  return (
    <section id="ia-advantage" className="relative bg-black py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-protest text-[#8364FF] text-4xl block -mb-5 relative z-10">
            DÉVELOPPEMENT
          </span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">
            AUGMENTÉ PAR L&apos;IA
          </span>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Visual Animation with Beams */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              ref={containerRef}
              className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-black/50 border border-[#8364FF]/30 p-10"
            >
              <div className="flex size-full flex-col max-w-lg max-h-[400px] items-stretch justify-between gap-10">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <Circle ref={div1Ref} className="border-[#C1FF00] size-16">
                      <Code size={32} className="text-[#C1FF00]" />
                    </Circle>
                    <span className="text-xs font-protest text-[#C1FF00]">REFACTORING</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Circle ref={div2Ref} className="border-[#FF8656] size-16">
                      <Sparkles size={32} className="text-[#FF8656]" />
                    </Circle>
                    <span className="text-xs font-protest text-[#FF8656]">EXPLORATION</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Circle ref={brainRef} className="size-24 border-[#8364FF]">
                      <Brain size={48} className="text-[#8364FF]" />
                    </Circle>
                    <span className="text-sm font-protest text-[#8364FF]">IA ASSISTANT</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <Circle ref={div3Ref} className="border-[#8364FF] size-16">
                      <Target size={32} className="text-[#8364FF]" />
                    </Circle>
                    <span className="text-xs font-protest text-[#8364FF]">TESTS AUTO</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Circle ref={div4Ref} className="border-[#C1FF00] size-16">
                      <Zap size={32} className="text-[#C1FF00]" />
                    </Circle>
                    <span className="text-xs font-protest text-[#C1FF00]">PRODUCTIVITÉ</span>
                  </div>
                </div>
              </div>

              {/* Animated Beams */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={brainRef}
                curvature={-75}
                endYOffset={-10}
                gradientStartColor="#C1FF00"
                gradientStopColor="#8364FF"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={brainRef}
                curvature={75}
                endYOffset={-10}
                reverse
                gradientStartColor="#FF8656"
                gradientStopColor="#8364FF"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={brainRef}
                curvature={-75}
                endYOffset={10}
                gradientStartColor="#8364FF"
                gradientStopColor="#C1FF00"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={div4Ref}
                toRef={brainRef}
                curvature={75}
                endYOffset={10}
                reverse
                gradientStartColor="#C1FF00"
                gradientStopColor="#8364FF"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-protest text-3xl text-[#FF8656]">
                L&apos;IA comme Accélérateur
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                J&apos;intègre l&apos;intelligence artificielle dans mon workflow de développement pour
                maximiser ma productivité et explorer rapidement de nouvelles solutions techniques.
              </p>
              <p className="text-gray-400 leading-relaxed">
                L&apos;IA me permet de générer des suggestions de refactoring, d&apos;écrire des tests
                automatisés, d&apos;explorer des architectures alternatives et d&apos;accélérer mon
                apprentissage de nouvelles technologies.
              </p>
            </div>

            <div className="border-l-4 border-[#8364FF] pl-6 py-2 bg-[#8364FF]/5">
              <p className="text-[#C1FF00] font-protest text-lg">
                Responsabilité Architecturale
              </p>
              <p className="text-gray-300 mt-2">
                Je garde toujours la responsabilité finale sur l&apos;architecture, la validation
                du code et les décisions techniques. Pour moi, un bon développeur avec IA est plus performant 
                qu’un développeur sans IA — mais un développeur dépendant de l’IA devient fragile.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Advantages Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aiAdvantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#8364FF]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative h-full p-6 rounded-xl border-2 border-[#8364FF]/30 bg-black/50 backdrop-blur-sm hover:border-[#C1FF00] transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${advantage.color}20` }}
                  >
                    <Icon size={24} style={{ color: advantage.color }} />
                  </div>
                  <h4 className="font-protest text-lg text-white mb-2">
                    {advantage.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '3x', label: 'Plus rapide', sublabel: 'Prototypage' },
            { value: '95%', label: 'Couverture tests', sublabel: 'Automatisés' },
            { value: '100%', label: 'Validation humaine', sublabel: 'Garantie' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="font-archivo text-5xl font-black text-[#C1FF00]">
                {stat.value}
              </div>
              <div className="font-protest text-lg text-[#8364FF]">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
