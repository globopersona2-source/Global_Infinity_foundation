'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Guitar, Hammer, Truck, Users, Sparkles, ArrowRight, Award, Heart, Star, Clock } from 'lucide-react'

const focusAreas = [
  { icon: Guitar, title: 'Promoting handcrafted musical instruments' },
  { icon: Hammer, title: 'Supporting traditional instrument makers' },
  { icon: Truck, title: 'Ensuring accessibility to quality instruments for students and musicians' },
  { icon: Users, title: 'Reinforcing cultural craftsmanship traditions' },
]

const artisans = [
  {
    name: 'Giovanni Rossi',
    craft: 'Violin Maker',
    experience: '35 years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'Every violin has a soul waiting to be awakened.'
  },
  {
    name: 'Maria Chen',
    craft: 'Guitar Artisan',
    experience: '28 years',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'The wood speaks through the hands of the maker.'
  },
  {
    name: 'James Wilson',
    craft: 'Piano Craftsman',
    experience: '42 years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quote: 'Tradition is the foundation of innovation.'
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
}

const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Parallax Card Component
function ParallaxCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrollY = window.scrollY
        const elementTop = rect.top + scrollY
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        
        if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
          const relativeScroll = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)
          setOffsetY((relativeScroll - 0.5) * 30)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{ y: offsetY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function InstrumentProductionPage() {
  return (
    <div className="bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50 min-h-screen overflow-hidden">
      {/* Hero Section - Full Width Image with Overlay */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/instrument.jpeg"
          alt="Instrument craftsmanship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-transparent"></div>

        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{ left: `${i * 5}%`, top: `${i * 3}%` }}
          />
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {/* Animated Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-white/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  CRAFTSMANSHIP SINCE 2020
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-7xl font-black text-white mb-6"
              >
                Instrument
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                  Production & Sales
                </span>
              </motion.h1>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { value: '10+', label: 'Master Artisans' },
                  { value: '500+', label: 'Instruments' },
                  { value: '30+', label: 'Years Heritage' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-amber-200">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Description Section - Split Screen with Image */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Image Gallery */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              <div className="relative w-full h-full">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute top-0 left-0 w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
                >
                  <Image
                    src="/instrument1.jpeg"
                    alt="Instrument making"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Second Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute bottom-0 right-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
                >
                  <Image
                    src="/instrument.jpeg"
                    alt="Guitar craftsmanship"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Floating Element */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-4 shadow-xl z-30"
                >
                  <Hammer className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Our Mission
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Preserving the Art of
                <span className="text-amber-600"> Instrument Making</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Global Infinity Foundation supports the production and promotion of quality musical instruments.
                By collaborating with skilled artisans and instrument makers, the foundation helps sustain
                traditional craftsmanship while ensuring that musicians have access to reliable instruments.
                The sale of instruments also contributes to supporting our music education initiatives and
                community programs.
              </p>

              {/* Key Points */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Award, text: 'Traditional Techniques' },
                  { icon: Heart, text: 'Sustainable Practices' },
                  { icon: Clock, text: 'Generational Knowledge' },
                  { icon: Users, text: 'Community Support' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* CTA Section - Split with Image */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto bg-gradient-to-br from-amber-600 to-amber-500 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
              className="p-12 text-white"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Support Traditional Craftsmanship
              </h3>
              <p className="text-white/90 mb-8 text-lg">
                Join us in preserving the art of instrument making for future generations.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                >
                  Get Involved
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              className="relative h-64 lg:h-96"
            >
              <Image
                src="https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center pb-12"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-all group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}