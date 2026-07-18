'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Music, Sparkles, ArrowRight, Heart, Star, Award, 
  GraduationCap, Users, BookOpen, Mic, School, Play
} from 'lucide-react'

const programs = [
  { 
    icon: BookOpen, 
    title: 'Classical music training programs',
    description: 'Comprehensive curriculum from beginner to advanced levels',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: '12+ Courses'
  },
  { 
    icon: Mic, 
    title: 'Workshops and masterclasses by experienced musicians',
    description: 'Learn directly from industry professionals and Grammy winners',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: '24+ Annual Events'
  },
  { 
    icon: School, 
    title: 'Outreach programs for schools and communities',
    description: 'Bringing music education to underserved communities',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: '50+ Schools'
  },
  { 
    icon: Award, 
    title: 'Scholarships and support for talented students',
    description: 'Financial aid and mentorship for promising musicians',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: '100+ Scholars'
  },
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

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

// Floating Music Note Component
function FloatingNote({ delay = 0, left = '0%', top = '0%' }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{ 
        duration: 8 + delay,
        repeat: Infinity,
        delay: delay
      }}
      className="absolute text-amber-200/20"
      style={{ left, top }}
    >
      <Music size={40 + delay * 10} />
    </motion.div>
  )
}

export default function MusicEducationPage() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingNote left="5%" top="10%" delay={0} />
      <FloatingNote left="90%" top="20%" delay={2} />
      <FloatingNote left="15%" top="70%" delay={4} />
      <FloatingNote left="80%" top="85%" delay={6} />
      <FloatingNote left="45%" top="40%" delay={8} />

      {/* Hero Section - Split Screen with Image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full">
            <div className="relative w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Music Education Hero"
                fill
                className="object-cover opacity-10"
              />
            </div>
          </div>
        </div>

        {/* Animated Gold Circles */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Gold Badge */}
              <motion.div
                variants={scaleUp}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider shadow-2xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    MUSIC EDUCATION
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={slideInLeft}
                className="text-6xl md:text-7xl font-black mb-6"
              >
                <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 bg-clip-text text-transparent">
                  Shape Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-yellow-400 bg-clip-text text-transparent">
                  Musical Future
                </span>
              </motion.h1>

              {/* Quote Card */}
              <motion.div
                variants={fadeIn}
                className="relative pl-8 mb-8"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-full"></div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Music education is at the heart of Global Infinity Foundation's work. 
                  The foundation aims to provide learning opportunities that inspire 
                  creativity, discipline, and cultural appreciation.
                </p>
              </motion.div>


            </motion.div>

            {/* Right Content - Image Collage (local images preserved) */}
            <motion.div
              variants={slideInRight}
              className="relative h-[600px] hidden lg:block"
            >
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 right-0 w-80 h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
              >
                <Image
                  src="/music-education.jpeg"
                  alt="Music teacher"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              </motion.div>

              {/* Second Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-0 left-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
              >
                <Image
                  src="/music-education1.jpeg"
                  alt="Music student"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              </motion.div>

              {/* Third Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-32 left-20 w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-30"
              >
                <Image
                  src="/music-education2.jpeg"
                  alt="Performance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              </motion.div>

              {/* Floating Gold Element */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-4 shadow-xl z-40"
              >
                <Play className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Gold Decorative Line */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        />
      </section>

      {/* Programs Section - Image Cards */}
      <section className="py-24 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-dashed border-amber-300 rounded-full mx-auto mb-6"
          />
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              Programs
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Programs Grid - Image Focused Cards */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <TiltCard>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-amber-200 group h-full">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent"></div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                          <program.icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Stats Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-amber-600 shadow-lg">
                        {program.stats}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {program.description}
                      </p>
                      
                      {/* Gold Divider */}
                      <div className="w-16 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mb-4"></div>

                      {/* Learn More Link */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-amber-600 font-medium cursor-pointer"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement - Full Width Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Music heritage"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-amber-800/90"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center px-4"
          >
            {/* Gold Circle Frame */}
            <div className="relative inline-block mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-amber-300 rounded-full"
              />
              <div className="relative w-24 h-24 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>

            <p className="text-2xl md:text-3xl text-white leading-relaxed mb-6">
              Through these initiatives, the foundation seeks to nurture the next generation 
              of musicians and preserve the rich traditions of music.
            </p>

            {/* Gold Signature Line */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400"></div>
              <Heart className="w-6 h-6 text-amber-300" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400"></div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* CTA Section - Gold with Image */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-amber-600 to-yellow-600 rounded-3xl p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Background"
                fill
                className="object-cover"
              />
            </div>

            {/* Animated Gold Circles */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"
            />

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Musical Journey
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Be part of a community that nurtures talent and preserves musical heritage
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="bg-white text-amber-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
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