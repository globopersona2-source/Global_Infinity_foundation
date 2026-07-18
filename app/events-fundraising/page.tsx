'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, Music, Heart, Globe, 
  Sparkles, ArrowRight, Ticket, Camera, 
  Mic, Users, Star, Clock, MapPin,
  Download, Share2
} from 'lucide-react'

const activities = [
  { 
    icon: Calendar, 
    title: 'Classical music concerts',
    description: 'Experience the magic of live classical performances featuring renowned artists.',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: '/classical-culture.jpeg',
  },
  { 
    icon: Music, 
    title: 'Cultural festivals',
    description: 'Celebrate diverse musical traditions from around the world.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    image: '/cultural-festival.jpeg',
  },
  { 
    icon: Heart, 
    title: 'Fundraising performances',
    description: 'Special concerts dedicated to raising funds for music education programs.',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    image: '/fundraising-performances.jpeg',
  },
  { 
    icon: Globe, 
    title: 'Community engagement events',
    description: 'Interactive workshops and activities that bring music to local communities.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    image: '/Community-engagement.jpeg',
  },
]

const upcomingEvents = [
  {
    title: 'Summer Classical Gala',
    date: 'June 15, 2024',
    time: '7:00 PM',
    location: 'City Concert Hall',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'Free',
    category: 'Concert'
  },
  {
    title: 'World Music Festival',
    date: 'July 22-24, 2024',
    time: 'All Day',
    location: 'Cultural Center',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a4c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'Donation',
    category: 'Festival'
  },
  {
    title: 'Benefit Concert for Music Education',
    date: 'August 5, 2024',
    time: '6:30 PM',
    location: 'Community Theater',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: '$25',
    category: 'Fundraising'
  },
  {
    title: 'Community Music Workshop',
    date: 'Every Saturday',
    time: '10:00 AM',
    location: 'Local Schools',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 'Free',
    category: 'Workshop'
  }
]

// Gallery images from public folder
const galleryImages = [
  '/classical-culture.jpeg',
  '/cultural-festival.jpeg',
  '/instrument.jpeg',
  '/music-education1.jpeg',
  '/Tabala.jpeg',
  '/music-education.jpeg',
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

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-2 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-lg p-2 min-w-[60px]">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-white/70 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  )
}

export default function EventsFundraisingPage() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 min-h-screen overflow-hidden">
      {/* Hero Section - Event Stage Theme */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <Image
          src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Event stage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-rose-900/80 to-amber-900/90"></div>

        {/* Stage Lights Effect */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-3xl"
        />

        {/* Floating Confetti */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0],
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              rotate: [0, 360, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#EC4899' : '#8B5CF6',
              left: `${i * 3}%`,
              top: `${i * 2}%`
            }}
          />
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Event Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-white/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  UPCOMING EVENTS & FUNDRAISERS
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-7xl font-black text-white mb-6"
              >
                Events &
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-rose-300">
                  Fundraising
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
              >
                Music has the power to bring communities together. Global Infinity Foundation organizes
                concerts, cultural programs, and fundraising events that celebrate artistic expression while
                supporting the foundation's initiatives.
              </motion.p>

              {/* Countdown to Next Event */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20"
              >
                <p className="text-white/80 mb-3">Next Event in:</p>
                <CountdownTimer targetDate="2024-06-15" />
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

      {/* Upcoming Events - Ticket Style Cards */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us at our upcoming concerts, festivals, and community gatherings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                variants={slideInUp}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <TiltCard>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                    {/* Image with Overlay */}
                    <div className="relative h-40">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600">
                        {event.category}
                      </div>

                      {/* Price Tag */}
                      <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {event.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">{event.title}</h3>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3 text-amber-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs py-1 px-3 rounded-full flex-1">
                          <Ticket className="w-3 h-3 mr-1" />
                          Get Ticket
                        </Button>
                        <Button size="sm" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50 text-xs py-1 px-3 rounded-full">
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section - Stage Design */}
      <section className="py-24 bg-gradient-to-b from-purple-100/30 via-rose-100/30 to-amber-100/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Activities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the variety of events we organize throughout the year
            </p>
          </motion.div>

          {/* Stage-like Platform */}
          <div className="relative max-w-6xl mx-auto">
            {/* Stage Base */}
            <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-r from-amber-700 to-purple-700 rounded-b-2xl"></div>
            
            {/* Stage Lights */}
            <div className="absolute -top-6 left-0 right-0 flex justify-around">
              {[1, 2, 3, 4].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 shadow-xl"
                />
              ))}
            </div>

            {/* Cards on Stage */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {activities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  variants={scaleUp}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={`${activity.bgColor} rounded-3xl overflow-hidden shadow-2xl border-2 border-white h-full group`}>
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${activity.color} opacity-60`}></div>
                      
                      {/* Icon Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center shadow-xl`}>
                          <activity.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:text-${activity.color.split('-')[1]}-600 transition-colors`}>
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {activity.description}
                      </p>
                      
                      {/* Learn More Link */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-1 text-${activity.color.split('-')[1]}-600 font-medium text-sm cursor-pointer`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery - Custom Grid: 4 images in first row, 2 centered below */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Event Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Capturing magical moments from our past events
            </p>
          </motion.div>

          {/* Flex container with wrap, 4 images per row on desktop */}
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, idx) => {
              // First 4 images: each takes 1/4 of the width (minus gap)
              // Last 2 images: each takes 1/2 of the width (centered as a pair)
              let widthClass = 'w-[calc(25%-0.75rem)]'; // 4 columns with gap 1rem total (gap-4 = 1rem)
              if (idx >= 4) widthClass = 'w-[calc(50%-0.5rem)]'; // 2 columns with gap

              // Responsive: on small screens, stack full width
              const responsiveClass = 'w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]';
              const responsiveLast = 'w-full sm:w-[calc(50%-0.5rem)]';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`${idx < 4 ? responsiveClass : responsiveLast} relative mb-4`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group aspect-[4/3]">
                    <Image
                      src={image}
                      alt={`Gallery ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fundraising Goal - Progress Bar */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">2024 Fundraising Goal</h3>
            <p className="text-white/90 mb-8">
              Help us reach our goal of $100,000 for music education programs
            </p>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-6 mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"
              />
            </div>

            <div className="flex justify-between text-sm">
              <span>$75,000 raised</span>
              <span>$100,000 goal</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8"
            >
              <Button className="bg-white text-purple-600 hover:bg-amber-50 font-bold px-10 py-6 rounded-full shadow-2xl text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Past Event Highlights</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((_, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                variants={slideInUp}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-amber-600 mb-2">150+</div>
                <p className="text-gray-600">Attendees at {idx === 0 ? 'Spring Concert' : idx === 1 ? 'Summer Festival' : 'Fall Gala'}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Host Your Event With Us</h2>
            <p className="text-gray-600 mb-8">
              Interested in collaborating on a concert or fundraising event? Let's create something beautiful together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-6 rounded-full shadow-xl">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-6 rounded-full">
                View Calendar
              </Button>
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