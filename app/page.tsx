'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { 
  Music, Guitar, CalendarHeart, Users, Award, ArrowRight, 
  Sparkles, Star, Heart, Play, ChevronRight,
  Globe, BookOpen, Mic, School, Volume2,
  Disc, Piano, TrendingUp, Shield, Clock, Coffee,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  GraduationCap, Quote
} from 'lucide-react'

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Musicians data
const musicians = [
  {
    name: 'Tony Trischka',
    title: 'Grammy-nominee & IBMA winner',
    category: 'BLUEGRASS',
    students: '10,729',
    image: 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Mike Marshall',
    title: 'Grammy-nominee',
    category: 'BLUEGRASS',
    students: '9,897',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Sierra Hull',
    title: 'Grammy-nominee & IBMA winner',
    category: 'BLUEGRASS',
    students: '5,676',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Keith Wyatt',
    title: 'Former GIT/MI director',
    category: 'BLUEGRASS',
    students: '5,487',
    image: 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Craig Chee and Sarah Maisel',
    title: 'World-renowned performers',
    category: 'BLUEGRASS',
    students: '4,974',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Darol Anger',
    title: 'IBMA Distinguished Achievement Award',
    category: 'BLUEGRASS',
    students: '4,891',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  }
]

// Create infinite array for seamless scrolling
const infiniteMusicians = [...musicians, ...musicians, ...musicians, ...musicians]

// 3D Tilt Card Component
function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// Floating Element Component
function FloatingElement({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Pulse Ring Component
function PulseRing() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20"></div>
      <div className="absolute inset-0 rounded-full bg-amber-400 animate-pulse opacity-30"></div>
    </div>
  )
}

// Musician Card Component
function MusicianCard({ musician, index }: { musician: typeof musicians[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className="min-w-[300px] md:min-w-[350px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
          {/* Image Container with Zoom Effect */}
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={musician.image}
              alt={musician.name}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            />
            {/* Gold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent"></div>
            
            {/* Category Badge */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg"
            >
              {musician.category}
            </motion.div>

            {/* Gold Star Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 flex items-center gap-1 shadow-lg"
            >
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>Featured</span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.h3 
              className="text-xl font-bold mb-1 text-gray-900"
              animate={{ color: isHovered ? '#B45309' : '#111827' }}
            >
              {musician.name}
            </motion.h3>
            <p className="text-sm text-gray-600 mb-3">{musician.title}</p>
            
            {/* Student Count with Icon */}
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <motion.span 
                className="font-medium text-gray-700"
                animate={{ color: isHovered ? '#B45309' : '#374151' }}
              >
                🎵 {musician.students} students taught
              </motion.span>
            </div>

            {/* Learn More Link */}
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="#" 
                className="text-sm font-medium inline-flex items-center gap-1 text-amber-600 hover:text-amber-700"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout>()

  // Auto-scroll function
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }

      autoScrollRef.current = setInterval(() => {
        const container = scrollContainerRef.current
        if (!container || isHovering || !isAutoScrolling) return

        const currentScroll = container.scrollLeft
        const maxScroll = container.scrollWidth - container.clientWidth
        
        let newScroll = currentScroll + 2
        
        if (newScroll >= maxScroll) {
          newScroll = 0
        }
        
        container.scrollTo({
          left: newScroll,
          behavior: 'auto'
        })
      }, 30)
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isHovering, isAutoScrolling])

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
      setTimeout(() => setIsAutoScrolling(true), 5000)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
      setTimeout(() => setIsAutoScrolling(true), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 overflow-hidden">

      {/* Hero Section - Cinematic Experience */}
<section className="relative min-h-[110vh] flex items-center overflow-hidden">        {/* Background Video/Gradient Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-slate-900/95 to-slate-900"></div>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 270, 180, 90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"
          />
          
          {/* Floating Music Notes */}
          {[...Array(8)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.5} className="absolute text-white/5">
              {i % 2 === 0 ? <Music size={60 + i * 10} /> : <Volume2 size={60 + i * 10} />}
            </FloatingElement>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              {/* Animated Badge */}
              <motion.div
                variants={scaleUp}
                className="inline-block mb-6"
              >
                <span className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-white/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  EMPOWERING COMMUNITIES
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={slideInLeft}
                className="text-5xl md:text-7xl font-black mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300">
                  Through Music,
                </span>
                <br />
                <span className="text-white">Craftsmanship,</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                  and Cultural Events
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeIn}
                className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
              >
                <span className="font-semibold text-amber-300">Global Infinity Foundation</span> is a non-profit organization dedicated to nurturing the transformative power of music in society. Through education, craftsmanship, and cultural events, we create sustainable opportunities for artists, students, and communities.
              </motion.p>

              {/* Quote */}
              <motion.p
                variants={fadeIn}
                className="text-md text-white/60 italic mb-8 border-l-4 border-amber-500 pl-4"
              >
                "We believe music is not only an art form but also a powerful medium for education, cultural preservation, and social development."
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-8 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all text-lg"
                >
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-black hover:bg-white/20 px-8 py-6 rounded-full text-lg"
                >
                  Get Involved
                </Button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeUp}
                className="flex gap-8 mt-12"
              >
                {[
                  { value: '100+', label: 'Students' },
                  { value: '10+', label: 'Artisans' },
                  { value: '50+', label: 'Events' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-amber-300">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Artistic Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px] w-full">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute top-0 right-0 w-96 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 z-10"
                >
                  <Image
                    src="/assets/images/Home1.jpeg"
                    alt="Music education"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                </motion.div>

                {/* Second Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute bottom-0 left-0 w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 z-20"
                >
                  <Image
                    src="/assets/images/Home2.jpeg"
                    alt="Craftsmanship"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                </motion.div>

                {/* Third Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute top-32 left-20 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 z-30"
                >
                  <Image
                    src="/assets/images/Home3.jpeg"
                    alt="Cultural events"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                </motion.div>

                {/* Floating Elements */}
                <FloatingElement delay={0} className="absolute -top-10 -right-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Music className="w-10 h-10 text-white" />
                  </div>
                </FloatingElement>

                <FloatingElement delay={2} className="absolute -bottom-10 -left-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                </FloatingElement>

                {/* Pulse Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <PulseRing />
                </div>
              </div>
            </motion.div>
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

      {/* Welcome Message Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #F59E0B 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8">
              Welcome to{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                Global Infinity Foundation
              </span>
            </h2>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Global Infinity Foundation is a non-profit organization dedicated to nurturing the transformative power of music in society. Through music education, the production and promotion of quality musical instruments, and cultural fundraising events, the foundation works to create sustainable opportunities for artists, students, and communities.
              </p>
              <p className="text-amber-600 font-medium italic">
                We believe music is not only an art form but also a powerful medium for education, cultural preservation, and social development.
              </p>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
              <Music className="w-6 h-6 text-amber-500" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-amber-500 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Focus Areas - Interactive Cards */}
 <section className="py-32 bg-gradient-to-br from-slate-50 to-amber-50">
  <div className="container mx-auto px-4">
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeUp}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Focus Areas</h2>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Discover how we're making a difference through music
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          icon: Music,
          title: 'Music Education',
          description: 'Providing accessible music learning opportunities, training programs, and workshops to nurture young talent and promote cultural heritage.',
          image: '/assets/images/FocusAreas1.jpeg',
          color: 'from-amber-500 to-yellow-500',
          stats: '100+ Students'
        },
        {
          icon: Guitar,
          title: 'Instrument Production & Sales',
          description: 'Supporting the production and distribution of quality musical instruments while promoting traditional craftsmanship and sustaining artisan communities.',
          image: '/assets/images/FocusAreas2.jpeg',
          color: 'from-amber-600 to-yellow-600',
          stats: '10+ Artisans'
        },
        {
          icon: CalendarHeart,
          title: 'Events & Fundraising',
          description: 'Organizing concerts, cultural festivals, and fundraising events that celebrate music while generating resources to support the foundation\'s initiatives.',
          image: '/assets/images/FocusAreas3.jpeg',
          color: 'from-amber-500 to-yellow-500',
          stats: '50+ Events'
        }
      ].map((area, idx) => (
        <motion.div
          key={idx}
          initial="hidden"
          whileInView="visible"
          variants={idx % 2 === 0 ? slideInLeft : slideInRight}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2 }}
          whileHover={{ y: -10 }}
        >
          <TiltCard>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Removed the gradient overlay div */}

                {/* Icon Overlay */}
                <div className="absolute bottom-4 left-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center shadow-xl`}>
                    <area.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-amber-600 shadow-lg">
                  {area.stats}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Learn More Link */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-amber-600 font-medium cursor-pointer group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Vision & Mission - Split Screen */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Vision */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <TiltCard>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-10 rounded-3xl shadow-xl border border-amber-200 h-full">
                  <div className="relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full"></div>
                    <h3 className="text-3xl font-bold text-amber-700 mb-4">Our Vision</h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mb-6 rounded-full"></div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      To create a society where music education, cultural heritage, and artistic expression are accessible to all.
                    </p>
                    
                    {/* Decorative Element */}
                    <div className="absolute bottom-0 right-0 opacity-10">
                      <Music className="w-24 h-24 text-amber-600" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <TiltCard>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-10 rounded-3xl shadow-xl border border-amber-200 h-full">
                  <div className="relative">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-500/10 rounded-full"></div>
                    <h3 className="text-3xl font-bold text-amber-700 mb-4">Our Mission</h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mb-6 rounded-full"></div>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      To promote music education, support traditional instrument craftsmanship, and organize cultural initiatives that generate sustainable resources for social development.
                    </p>
                    
                    {/* Decorative Element */}
                    <div className="absolute bottom-0 right-0 opacity-10">
                      <Heart className="w-24 h-24 text-amber-600" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Impact Numbers */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, value: '100+', label: 'Students' },
              { icon: Award, value: '10+', label: 'Artisans' },
              { icon: CalendarHeart, value: '50+', label: 'Events' },
              { icon: Heart, value: '150+', label: 'Lives Impacted' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="text-center text-white"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Join Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                Musical Journey
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Be part of a community that believes in the transformative power of music. Together, we can create lasting change.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-bold px-10 py-6 rounded-full shadow-xl text-lg"
              >
                Support Our Mission
                <Heart className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-10 py-6 rounded-full text-lg"
              >
                Partner With Us
              </Button>
            </div>

            {/* Decorative Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  className="w-2 h-2 bg-amber-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}

    </div>
  )
}