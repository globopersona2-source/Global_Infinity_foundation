'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Handshake, Users, Megaphone, Sparkles, ArrowRight, Gift, Calendar, Globe, Coffee, Star, Award } from 'lucide-react'

const ways = [
  { 
    icon: Heart, 
    title: 'Make a donation',
    description: 'Your financial support helps us provide music education to underserved communities.',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    image: '/donation.jpeg',
    stats: '500+ Donors'
  },
  { 
    icon: Handshake, 
    title: 'Sponsor music education programs',
    description: 'Partner with us to sponsor workshops, masterclasses, and training programs.',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: '/sponser.jpeg',
    stats: '25+ Programs'
  },
  { 
    icon: Users, 
    title: 'Support instrument production initiatives',
    description: 'Help us provide quality instruments to students and preserve traditional craftsmanship.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    image: '/Support-instrument-production.jpeg',
    stats: '100+ Instruments'
  },
  { 
    icon: Megaphone, 
    title: 'Volunteer in events and activities',
    description: 'Join our team of volunteers and help organize concerts, festivals, and cultural events.',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    image: '/volunteer.jpeg',
    stats: '200+ Volunteers'
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

export default function GetInvolvedPage() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen overflow-hidden">
      {/* Hero Section - Full Width Image with Overlay */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Get involved"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-transparent"></div>

        {/* Animated Floating Icons */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -50, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-white/20"
            style={{ left: `${i * 12}%`, top: `${i * 8}%` }}
          >
            {i % 2 === 0 ? <Heart size={40 + i * 5} /> : <Handshake size={40 + i * 5} />}
          </motion.div>
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
                  JOIN OUR MISSION
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-7xl font-black text-white mb-6"
              >
                Get
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                  Involved
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-white/90 mb-8 max-w-xl"
              >
                There are many ways to support Global Infinity Foundation and become part of its mission.
                Every contribution helps strengthen the impact of music in communities.
              </motion.p>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-amber-600 hover:bg-amber-50 font-bold px-8 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all text-lg"
                >
                  Donate Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-gold hover:bg-white/20 px-8 py-6 rounded-full text-lg"
                >
                  Become a Volunteer
                </Button>
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


      {/* Ways to Get Involved - Creative Card Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ways to Get Involved</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose how you'd like to make a difference in our community
            </p>
          </motion.div>

          {/* Alternating Layout Cards */}
          <div className="space-y-16 max-w-5xl mx-auto">
            {ways.map((way, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                variants={idx % 2 === 0 ? slideInLeft : slideInRight}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image Side */}
                <div className="lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative h-80 rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={way.image}
                      alt={way.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${way.color} opacity-60`}></div>
                    
                    {/* Floating Icon */}
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute bottom-6 right-6"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${way.color} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <way.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Stats Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
                      {way.stats}
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2">
                  <ParallaxCard>
                    <div className={`${way.bgColor} p-8 rounded-3xl shadow-xl border border-${way.color.split('-')[1]}-200`}>
                      <h3 className={`text-2xl font-bold text-gray-900 mb-3`}>{way.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{way.description}</p>
                      
                      {/* Action Button */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 cursor-pointer group"
                      >
                        <span className={`font-semibold text-${way.color.split('-')[1]}-600`}>
                          Learn More
                        </span>
                        <ArrowRight className={`w-4 h-4 text-${way.color.split('-')[1]}-600 group-hover:translate-x-1 transition-transform`} />
                      </motion.div>

                      {/* Progress Indicator */}
                      <div className="mt-6 h-1 bg-white rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${70 + idx * 5}%` }}
                          transition={{ delay: idx * 0.2, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${way.color}`}
                        />
                      </div>
                    </div>
                  </ParallaxCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action - Gradient Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Donate Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden h-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"
                />
                
                <Gift className="w-16 h-16 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Make a Donation</h3>
                <p className="text-white/90 mb-8">
                  Your financial support helps us provide music education to underserved communities.
                </p>
                <Button 
                  className="bg-white text-rose-600 hover:bg-rose-50 font-bold px-8 py-6 rounded-full shadow-xl w-full"
                >
                  Donate Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Volunteer Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden h-full">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"
                />
                
                <Calendar className="w-16 h-16 mb-6" />
                <h3 className="text-3xl font-bold mb-4">Become a Volunteer</h3>
                <p className="text-white/90 mb-8">
                  Join our team of volunteers and help organize concerts, festivals, and cultural events.
                </p>
                <Button 
                  className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-6 rounded-full shadow-xl w-full"
                >
                  Sign Up Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Make a Difference */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join us in our mission to empower communities through music.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-10 py-6 rounded-full shadow-xl text-lg">
                  Donate Now
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-10 py-6 rounded-full text-lg">
                  Become a Volunteer
                </Button>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-2 mt-8">
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