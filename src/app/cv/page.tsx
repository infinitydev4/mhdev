'use client'

import { motion } from 'framer-motion'
import { Download, Mail, Phone, MapPin, Globe, Github } from 'lucide-react'
import { Button3D } from '@/components/ui/Button3D'
import { useRef } from 'react'

type HeaderVariant = 'lime' | 'violet' | 'orange'

const headerBgClassByVariant: Record<HeaderVariant, string> = {
  lime: 'bg-[#C1FF00]',
  violet: 'bg-[#8364FF]',
  orange: 'bg-[#FF8656]',
}

function WindowHeader({ title, variant, rightText }: { title: string; variant: HeaderVariant; rightText?: string }) {
  return (
    <div className={`${headerBgClassByVariant[variant]} h-7 px-3`}>
      <table className="w-full h-full border-collapse">
        <tbody>
          <tr>
            <td className="align-middle">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 align-middle mr-1"></span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 align-middle mr-1"></span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 align-middle mr-2"></span>
              <span className="pdf-window-title font-protest text-xs text-black align-middle leading-none">{title}</span>
            </td>
            {rightText ? (
              <td className="align-middle text-right">
                <span className="pdf-window-date text-xs font-protest text-black align-middle leading-none">{rightText}</span>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function CVPage() {
  const cvRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!cvRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default
      await (document as Document & { fonts?: FontFaceSet }).fonts?.ready
      await new Promise((resolve) => requestAnimationFrame(() => resolve(true)))

      // Capture le CV en image avec meilleurs paramètres
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#000000',
        windowWidth: cvRef.current.scrollWidth,
        windowHeight: cvRef.current.scrollHeight,
        onclone: (clonedDocument) => {
          clonedDocument.documentElement.classList.add('pdf-capture-mode')
        },
      })

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = 210 // A4 width in mm
      const pdfHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      // Étirer l'image pour remplir toute la page A4
      const finalHeight = imgHeight < pdfHeight ? pdfHeight : imgHeight
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, finalHeight)

      pdf.save('Mohamed_Oullami_CV.pdf')
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error)
      // Fallback sur l'impression
      window.print()
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-end print:hidden"
        >
          <Button3D onClick={handleDownload}>
            <span className="flex items-center gap-2 font-protest">
              <Download size={20} />
              TÉLÉCHARGER CV
            </span>
          </Button3D>
        </motion.div>

        {/* CV Container */}
        <motion.div
          ref={cvRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border-2 border-[#8364FF] rounded-lg p-4 print:border-0"
        >
          {/* Header */}
          <div className="border-b-2 border-[#8364FF] pb-3 mb-3">
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* Photo + Nom */}
              <div className="flex items-center gap-4 flex-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-32 h-32 flex-shrink-0"
                >
                  {/* Cercle de fond avec bordure */}
                  <div className="absolute inset-0 rounded-full border-4 border-[#8364FF] shadow-lg shadow-[#8364FF]/50 bg-black"></div>
                  
                  {/* Image qui dépasse */}
                  <div className="relative w-full h-full overflow-visible">
                    <img
                      src="/images/mohamed-dev.png"
                      alt="Mohamed Oullami"
                      className="absolute -bottom-5 left-[4.2rem] -translate-x-1/2 object-contain"
                      style={{ 
                        width: '150px',
                        height: '190px',
                        maxWidth: 'none'
                      }}
                    />
                  </div>
                  
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#C1FF00]/20 to-transparent pointer-events-none"></div>
                </motion.div>

                {/* Nom et titre */}
                <div className="flex-1">
                  <h1 className="font-archivo text-3xl md:text-4xl font-black text-[#C1FF00] mb-1">
                    MOHAMED OULLAMI
                  </h1>
                  <h2 className="font-protest text-lg md:text-xl text-[#8364FF] mb-2">
                    Développeur Fullstack Ruby on Rails Confirmé
                  </h2>
                  <a 
                    href="https://github.com/homdev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#C1FF00] transition-colors font-mono"
                  >
                    <Github size={16} className="text-[#8364FF] flex-shrink-0 pdf-github-icon" />
                    <span className="leading-none">github.com/homdev</span>
                  </a>
                </div>
              </div>

              {/* Contact Info - Fenêtre à droite */}
              <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent w-full md:w-auto">
                <WindowHeader title="CONTACT" variant="violet" />
                <div className="p-2 md:min-w-[200px]">
                  <table className="w-full border-collapse text-xs text-gray-300 font-mono">
                    <tbody>
                      <tr className="pdf-contact-row">
                        <td className="align-middle pb-1.5">
                          <span className="inline-block align-middle mr-2" style={{ width: '14px', height: '14px' }}><MapPin size={14} className="text-[#C1FF00]" /></span>
                          <span className="align-middle">Nantes, France</span>
                        </td>
                      </tr>
                      <tr className="pdf-contact-row">
                        <td className="align-middle pb-1.5">
                          <span className="inline-block align-middle mr-2" style={{ width: '14px', height: '14px' }}><Phone size={14} className="text-[#C1FF00]" /></span>
                          <span className="align-middle">+33 7 67 03 68 48</span>
                        </td>
                      </tr>
                      <tr className="pdf-contact-row">
                        <td className="align-middle pb-1.5">
                          <span className="inline-block align-middle mr-2" style={{ width: '14px', height: '14px' }}><Mail size={14} className="text-[#C1FF00]" /></span>
                          <span className="align-middle">m.oullami@outlook.fr</span>
                        </td>
                      </tr>
                      <tr className="pdf-contact-row">
                        <td className="align-middle">
                          <span className="inline-block align-middle mr-2" style={{ width: '14px', height: '14px' }}><Globe size={14} className="text-[#C1FF00]" /></span>
                          <span className="align-middle">www.mhdev.xyz</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Profile */}
          <section className="mb-3">
            <div className="border-2 border-[#C1FF00] rounded-lg overflow-hidden bg-gradient-to-b from-[#C1FF00]/10 to-transparent">
              <WindowHeader title="PROFIL" variant="lime" />
              <div className="p-2">
                <p className="text-gray-300 leading-tight text-xs font-mono">
                  Développeur Fullstack Ruby on Rails confirmé avec plus de 7 ans d&apos;expérience dans la conception 
                  d&apos;applications SaaS performantes. Spécialisé en architecture API-first, optimisation backend et 
                  mise en production de solutions scalables. Expert en bonnes pratiques (TDD, Clean Architecture, SOLID) 
                  et méthodologies DevOps modernes.
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-3">
            <h3 className="font-protest text-lg text-[#FF8656] mb-1.5 border-b border-[#8364FF]/30 pb-1">
              EXPÉRIENCES PROFESSIONNELLES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {/* WebConcepter */}
              <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent">
                <WindowHeader title="WEBCONCEPTER" variant="violet" rightText="2018-2026"/>
                <div className="p-1.5">
                  <p className="text-[10px] text-gray-400 mb-0.5 font-mono">Freelance - Développeur Fullstack Ruby on Rails</p>
                  <div className="space-y-0 text-[10px] font-mono">
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Architecture SaaS Rails (API, multi-tenant)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">PostgreSQL, optimisation & performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Sidekiq & Redis (jobs async)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Frontend React et Next.js</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Docker et pipelines CI/CD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital College */}
              <div className="border-2 border-[#C1FF00] rounded-lg overflow-hidden bg-gradient-to-b from-[#C1FF00]/10 to-transparent">
                <WindowHeader title="DIGITAL COLLEGE" variant="lime" rightText="2024-2025" />
                <div className="p-1.5">
                  <p className="text-[10px] text-gray-400 mb-0.5 font-mono">Intervenant - Formateur Web Fullstack</p>
                  <div className="space-y-0 text-[10px] font-mono">
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Formation Ruby on Rails, React.js</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Bonnes pratiques architecture & API</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">TDD, tests automatisés et CI/CD</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Accompagnement projets étudiants</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Déploiement applications web</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steeple */}
              <div className="border-2 border-[#FF8656] rounded-lg overflow-hidden bg-gradient-to-b from-[#FF8656]/10 to-transparent">
                <WindowHeader title="STEEPLE" variant="orange" rightText="2019-2021" />
                <div className="p-1.5">
                  <p className="text-[10px] text-gray-400 mb-0.5 font-mono">Développeur Fullstack Ruby on Rails</p>
                  <div className="space-y-0 text-[10px] font-mono">
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Développement plateforme communication interne</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Architecture API REST Rails</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Intégrations multi-supports (web, mobile, écran tactile)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Optimisation performance & scalabilité</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ASSYS */}
              <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent">
                <WindowHeader title="ASSYS - ESN" variant="violet" rightText="2017-2019" />
                <div className="p-1.5">
                  <p className="text-[10px] text-gray-400 mb-0.5 font-mono">Développeur Fullstack</p>
                  <div className="space-y-0 text-[10px] font-mono">
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Fullstack Ruby on Rails / React-Next.js</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Conception API Rails</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Optimisation PostgreSQL et Redis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#C1FF00] font-bold">•</span>
                      <span className="text-gray-300">Features métier projets clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-3">
            <h3 className="font-protest text-lg text-[#FF8656] mb-1.5 border-b border-[#8364FF]/30 pb-1">
              COMPÉTENCES TECHNIQUES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
              {/* Backend Window */}
              <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent">
                <WindowHeader title="BACKEND" variant="violet" />
                <div className="p-1.5">
                  <div className="grid grid-cols-6 gap-1">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Ruby on Rails.png" alt="Rails" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Rails</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Ruby.png" alt="Ruby" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Ruby</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Node.js.png" alt="Node.js" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Node</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Nest.js.png" alt="Nest.js" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Nest</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/PostgresSQL.png" alt="PostgreSQL" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">PG</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Redis.png" alt="Redis" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Redis</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Frontend Window */}
              <div className="border-2 border-[#C1FF00] rounded-lg overflow-hidden bg-gradient-to-b from-[#C1FF00]/10 to-transparent">
                <WindowHeader title="FRONTEND" variant="lime" />
                <div className="p-1.5">
                  <div className="grid grid-cols-6 gap-1">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/React.png" alt="React" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">React</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/next.png" alt="Next.js" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Next</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/TypeScript.png" alt="TypeScript" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">TS</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/TailwindCSS.png" alt="Tailwind" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Tailwind</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/HTML5.png" alt="HTML5" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">HTML5</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/CSS3.png" alt="CSS3" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">CSS3</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* DevOps Window */}
              <div className="border-2 border-[#FF8656] rounded-lg overflow-hidden bg-gradient-to-b from-[#FF8656]/10 to-transparent">
                <WindowHeader title="DEVOPS" variant="orange" />
                <div className="p-1.5">
                  <div className="grid grid-cols-5 gap-1">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Docker.png" alt="Docker" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Docker</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Kubernetes.png" alt="Kubernetes" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">K8s</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Git.png" alt="Git" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Git</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/Jenkins.png" alt="Jenkins" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Jenkins</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 mb-0">
                        <img src="/images/logos/nginx.svg" alt="Nginx" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] text-gray-400 font-mono">Nginx</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formation */}
          <section className="mb-3">
            <h3 className="font-protest text-lg text-[#FF8656] mb-1.5 border-b border-[#8364FF]/30 pb-1">
              FORMATIONS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {/* Master */}
              <div className="border-2 border-[#C1FF00] rounded-lg overflow-hidden bg-gradient-to-b from-[#C1FF00]/10 to-transparent">
                <WindowHeader title="MASTER" variant="lime" rightText="2015-2017" />
                <div className="p-2">
                  <h4 className="font-archivo font-bold text-[#C1FF00] text-sm mb-0.5">Master Informatique</h4>
                  <p className="text-xs text-gray-400 font-mono">Génie logiciels / architecture logicielle</p>
                </div>
              </div>

              {/* Licence */}
              <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent">
                <WindowHeader title="LICENCE (SIL)" variant="violet" rightText="2014-2015" />
                <div className="p-1.5">
                  <h4 className="font-archivo font-bold text-[#C1FF00] text-xs mb-0.5">IUT de Nantes</h4>
                  <p className="text-xs text-gray-400 font-mono">Systèmes informatiques et logiciels</p>
                </div>
              </div>

              {/* BTS */}
              <div className="border-2 border-[#FF8656] rounded-lg overflow-hidden bg-gradient-to-b from-[#FF8656]/10 to-transparent">
                <WindowHeader title="BTS (SE)" variant="orange" rightText="2012-2014" />
                <div className="p-1.5">
                  <h4 className="font-archivo font-bold text-[#C1FF00] text-xs mb-0.5">Livet</h4>
                  <p className="text-xs text-gray-400 font-mono">Systèmes électroniques</p>
                </div>
              </div>

              {/* Bootcamp */}
              <div className="border-2 border-[#C1FF00] rounded-lg overflow-hidden bg-gradient-to-b from-[#C1FF00]/10 to-transparent">
                <WindowHeader title="BOOTCAMP" variant="lime" rightText="2017-2018" />
                <div className="p-1.5">
                  <h4 className="font-archivo font-bold text-[#C1FF00] text-xs mb-0.5">The Hacking Project</h4>
                  <p className="text-xs text-gray-400 font-mono">Développeur Fullstack Ruby on Rails</p>
                </div>
              </div>
            </div>
          </section>

          {/* Langues & Centres d'intérêt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {/* Langues */}
            <div className="border-2 border-[#8364FF] rounded-lg overflow-hidden bg-gradient-to-b from-[#8364FF]/10 to-transparent">
              <WindowHeader title="LANGUES" variant="violet" />
              <div className="p-4">
                <ul className="text-xs text-gray-300 space-y-2 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">🇫🇷</span>
                    <span><span className="text-[#C1FF00] font-bold">Français</span> - Langue maternelle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">🇬🇧</span>
                    <span><span className="text-[#C1FF00] font-bold">Anglais</span> - Niveau professionnel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">🇪🇸</span>
                    <span><span className="text-[#C1FF00] font-bold">Espagnol</span> - Niveau professionnel</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Centres d'intérêt */}
            <div className="border-2 border-[#FF8656] rounded-lg overflow-hidden bg-gradient-to-b from-[#FF8656]/10 to-transparent">
              <WindowHeader title={"CENTRES D'INTÉRÊT"} variant="orange" />
              <div className="p-4">
                <ul className="text-xs text-gray-300 space-y-2 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">🚀</span>
                    <span>Open Source & Contribution projets tech</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">📚</span>
                    <span>Veille technologique & Architecture logicielle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#C1FF00]">🎓</span>
                    <span>Mentorat & Formation développeurs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        .pdf-capture-mode .pdf-window-title,
        .pdf-capture-mode .pdf-window-date {
          display: inline-block !important;
          line-height: 10px !important;
          transform: translateY(-3px) !important;
        }

        .pdf-capture-mode .pdf-github-icon {
          display: inline-block !important;
          vertical-align: middle !important;
          transform: translateY(5px) !important;
        }

        .pdf-capture-mode .pdf-contact-row span.inline-block {
          transform: translateY(3px) !important;
        }

        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
        }
      `}</style>
    </main>
  )
}
