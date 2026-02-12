'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button3D } from './ui/Button3D'

type TechStackCategory = {
  id: string
  title: string
  color: string
  technologies: {
    name: string
    logo: string
  }[]
}

const techStacks: TechStackCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    color: '#8364FF',
    technologies: [
      { name: 'Ruby on Rails', logo: '/images/logos/Ruby on Rails.png' },
      { name: 'Ruby', logo: '/images/logos/Ruby.png' },
      { name: 'Node.js', logo: '/images/logos/Node.js.png' },
      { name: 'Nest.js', logo: '/images/logos/Nest.js.png' },
      { name: 'PostgreSQL', logo: '/images/logos/PostgresSQL.png' },
      { name: 'Redis', logo: '/images/logos/Redis.png' },
      { name: 'Sidekiq', logo: '/images/logos/sidek.png' },

    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    color: '#C1FF00',
    technologies: [
      { name: 'React', logo: '/images/logos/React.png' },
      { name: 'Next.js', logo: '/images/logos/next.png' },
      { name: 'TypeScript', logo: '/images/logos/TypeScript.png' },
      { name: 'JavaScript', logo: '/images/logos/javascript.svg' },
      { name: 'TailwindCSS', logo: '/images/logos/TailwindCSS.png' },
      { name: 'HTML5', logo: '/images/logos/HTML5.png' },
      { name: 'CSS3', logo: '/images/logos/CSS3.png' },
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    color: '#FF8656',
    technologies: [
      { name: 'Docker', logo: '/images/logos/Docker.png' },
      { name: 'Kubernetes', logo: '/images/logos/Kubernetes.png' },
      { name: 'Git', logo: '/images/logos/Git.png' },
      { name: 'Jenkins', logo: '/images/logos/jenkins.png' },
      { name: 'DigitalOcean', logo: '/images/logos/digitalocean.svg' },
      { name: 'Heroku', logo: '/images/logos/heroku.svg' },
      { name: 'Nginx', logo: '/images/logos/nginx.svg' },
    ]
  }
]

const TechCard: FC<{ name: string; logo: string; index: number }> = ({ name, logo, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3, delay: index * 0.03 }}
    whileHover={{ scale: 1.08, y: -3 }}
    className="group relative flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed border-[#8364FF]/30 bg-black/50 hover:border-[#8364FF] hover:bg-black/70 transition-all duration-300"
  >
    <div className="relative w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110">
      <Image
        src={logo}
        alt={name}
        fill
        className="object-contain"
      />
    </div>
    <span className="text-xs font-archivo text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
      {name}
    </span>
  </motion.div>
)

const TechStackSection: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('backend')

  const activeCategory = techStacks.find(stack => stack.id === activeTab)

  return (
    <section id="competences" className="relative bg-black py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center relative"
        >
          <span className="font-protest text-[#8364FF] text-6xl block -mb-5 relative z-10">Tech</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">STACK</span>
        </motion.h2>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-12 px-4"
        >
          {techStacks.map((stack) => {
            const isActive = activeTab === stack.id
            const shadowColor = isActive ? stack.color : '#4B5563'
            
            return (
              <Button3D
                key={stack.id}
                onClick={() => setActiveTab(stack.id)}
                className="relative px-3 sm:px-6 py-3 sm:py-4 font-protest text-sm sm:text-base md:text-lg font-bold"
                style={{
                  backgroundColor: isActive ? stack.color : '#1F2937',
                  borderColor: isActive ? stack.color : '#4B5563',
                  boxShadow: `0 4px 0 ${shadowColor}dd`,
                  color: isActive ? '#000000' : '#9CA3AF',
                }}
              >
                <span className="relative z-10 block">{stack.title}</span>
              </Button3D>
            )
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto">
                {activeCategory.technologies.map((tech, index) => (
                  <TechCard 
                    key={tech.name}
                    name={tech.name}
                    logo={tech.logo}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-block rounded-lg border-2 border-dashed border-[#8364FF] bg-black/50 px-8 py-4">
            <p className="font-archivo text-gray-400">
              <span className="text-[#C1FF00] font-bold">+7 ans</span> d&apos;expertise en développement fullstack
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackSection
