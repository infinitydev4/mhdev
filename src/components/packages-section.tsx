'use client'

import { motion } from 'framer-motion'
import { Star, MessageSquare } from 'lucide-react'
import { Button3D } from './ui/Button3D'

type Package = {
  name: string
  price: number
  days: number
  color: string
  features: {
    text: string
    subtext?: string
    highlight?: boolean
  }[]
}

const packages: Package[] = [
  {
    name: 'CUSTOM',
    price: 2200,
    days: 10,
    color: 'white',
    features: [
      { text: 'Questionnaire' },
      { text: 'Wireframe' },
      { text: 'Custom Design', subtext: 'Figma (unlimited revisions)' },
      { text: 'Development', subtext: 'html/css/js' },
      { text: 'Copywriting', subtext: 'headlines, benefits, about us' },
    ]
  },
  {
    name: 'DYNAMIC',
    price: 3200,
    days: 14,
    color: '#C1FF00',
    features: [
      { text: 'Questionnaire' },
      { text: 'Wireframe' },
      { text: 'Custom Design', subtext: 'Figma (unlimited revisions)' },
      { text: 'Development', subtext: 'html/css/js build', highlight: true },
      { text: 'Copywriting', subtext: 'full page', highlight: true },
      { text: 'SEO', highlight: true },
      { text: 'Dynamic content', subtext: 'mouse interactions, transitions, effects', highlight: true }
    ]
  },
  {
    name: 'ULTRA',
    price: 6000,
    days: 16,
    color: '#8364FF',
    features: [
      { text: 'Questionnaire' },
      { text: 'Wireframe' },
      { text: 'Custom Design', subtext: 'Figma (unlimited revisions)' },
      { text: 'Development', subtext: 'Wordpress & Elementor', highlight: true },
      { text: 'Copywriting', subtext: 'full page', highlight: true },
      { text: 'SEO', highlight: true },
      { text: 'Dynamic content', subtext: 'mouse interactions, transitions, effects', highlight: true },
      { text: '1 min Explainer video', highlight: true }
    ]
  }
]

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-800/50 to-black/50 backdrop-blur-xl" />
      <div className="relative p-6 space-y-6">
        {/* Package illustration */}
        <div className="relative w-full aspect-[4/3] mb-8">
          <div className="absolute inset-0 rounded-xl border border-gray-800 bg-black/50">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-3/4 h-3/4 rounded-lg border border-gray-700" style={{ backgroundColor: '#0A0A0A' }} />
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: pkg.color }} />
          </div>
        </div>

        {/* Package name */}
        <h3 className="text-2xl font-archivo font-bold" style={{ color: pkg.color }}>
          {pkg.name}
        </h3>

        {/* Features list */}
        <ul className="space-y-3">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Star
                className="w-4 h-4 mt-1 flex-shrink-0"
                style={{ color: feature.highlight ? pkg.color : 'white' }}
              />
              <div>
                <div className="font-medium font-protest" style={{ color: feature.highlight ? pkg.color : 'white' }}>
                  {feature.text}
                </div>
                {feature.subtext && (
                  <div className="text-sm text-gray-400">{feature.subtext}</div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Delivery time */}
        <div className="text-gray-400">{pkg.days} days</div>

        {/* Price */}
        <div className="text-4xl font-bold" style={{ color: pkg.color }}>
          ${pkg.price}
        </div>
      </div>

      {/* Hover effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: pkg.color }}
      />
    </motion.div>
  )
}

export default function PackagesSection() {
  return (
    <section className="relative bg-black py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-bold"
        >
          <span className="font-protest text-[#8364FF] text-5xl block -mb-5 relative z-10">MES</span>
          <span className="font-archivo text-[#C1FF00] text-5xl font-black relative z-0">OFFRES</span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button3D>
            <span className="flex items-center gap-2 font-protest">
              ENVOYER UN MESSAGE
              <MessageSquare size={20} className="inline-block" />
            </span>
          </Button3D>
        </motion.div>
      </div>
    </section>
  )
}

