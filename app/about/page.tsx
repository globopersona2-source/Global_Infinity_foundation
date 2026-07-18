'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Music, Heart, Users, Globe, Sparkles, Award, Calendar } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
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

const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.8 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6 } }
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

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen overflow-hidden">
      {/* Hero Section - Asymmetrical Layout */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Background Geometric Shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-10 w-48 h-48 bg-amber-300/20 rounded-lg rotate-45 blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Unique Header Layout */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col lg:flex-row items-start gap-12"
          >
            {/* Left Side - Vertical Timeline Style */}
            <div className="flex-1 space-y-8">
              {/* Floating Badge */}
              <motion.div
                variants={rotateIn}
                className="inline-block relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-30"></div>
                <span className="relative bg-white px-6 py-3 rounded-full text-sm font-bold text-amber-600 shadow-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  EST. 2010
                </span>
              </motion.div>

              {/* Main Heading with Unique Typography */}
              <motion.h1
                variants={slideInLeft}
                className="relative"
              >
                <span className="text-7xl md:text-8xl font-black text-transparent [-webkit-text-stroke:2px_#B45309] opacity-20 block leading-none">
                  ABOUT
                </span>
                <span className="text-5xl md:text-6xl font-bold text-gray-900 block -mt-8 ml-12">
                  Global Infinity
                </span>
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent block ml-16">
                  Foundation
                </span>
              </motion.h1>

              {/* Stats in Unique Grid */}
              <motion.div 
                variants={fadeUp}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {[
                  { icon: Users, value: '500+', label: 'Students', color: 'from-amber-500 to-yellow-500' },
                  { icon: Heart, value: '30+', label: 'Artisans', color: 'from-amber-600 to-yellow-600' },
                  { icon: Globe, value: '50+', label: 'Events', color: 'from-amber-500 to-yellow-500' },
                  { icon: Award, value: '15+', label: 'Years', color: 'from-amber-600 to-yellow-600' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-amber-100"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-2`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Creative Image Collage */}
            <motion.div 
              variants={slideInRight}
              className="flex-1 relative"
            >
              <div className="relative h-[500px] w-full">
                {/* Main Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute top-0 right-0 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
                >
                  <img
                     src="/Tabala.jpeg"               
                        alt="Music foundation"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Second Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute bottom-0 left-0 w-72 h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20"
                >
                  <img
                    src="/tabala1.jpeg"               
                      alt="Music education"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Third Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute top-32 left-20 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-30"
                >
                  <img
                      src="/tabala2.jpeg"       
                            alt="Musician"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Element */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl p-4 shadow-xl z-40"
                >
                  <Music className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Magazine Style Layout */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Section Title with Unique Style */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-16 relative"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
            <span className="text-6xl font-black text-amber-200/30 block -mb-8">OUR STORY</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 relative z-10">
              Journey of <span className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">Music</span>
            </h2>
          </motion.div>

          {/* Content in Unique Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Stacked Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* First Paragraph - Diagonal Style */}
              <motion.div
                variants={fadeUp}
                whileHover={{ x: 10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-bl-full"></div>
                <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                  Global Infinity Foundation is committed to advancing music as a tool for education,
                  cultural preservation, and community development. The foundation brings together educators,
                  musicians, artisans, and supporters who believe in the positive impact of music on society.
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>

              {/* Second Paragraph - Offset Style */}
              <motion.div
                variants={fadeUp}
                whileHover={{ x: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 ml-12 relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-500/10 to-yellow-500/10 rounded-tr-full"></div>
                <p className="text-lg text-gray-700 leading-relaxed relative z-10">
                  Through carefully designed programs and initiatives, the foundation works to expand access
                  to music education, support instrument makers, and create meaningful cultural experiences
                  through events.
                </p>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-yellow-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Vision & Mission - Split Screen Layout */}
          <div className="grid md:grid-cols-2 gap-0 mt-20 rounded-3xl overflow-hidden shadow-2xl">
            {/* Vision */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-600 to-yellow-600 p-12 text-white relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <h2 className="text-3xl font-bold mb-6 relative z-10">Our Vision</h2>
              <div className="w-20 h-1 bg-white mb-8 rounded-full"></div>
              <p className="text-lg leading-relaxed relative z-10">
                To build a world where music becomes a bridge connecting culture, education, and community
                growth.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-bl from-amber-700 to-yellow-700 p-12 text-white relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <h2 className="text-3xl font-bold mb-6 relative z-10">Our Mission</h2>
              <div className="w-20 h-1 bg-white mb-8 rounded-full"></div>
              <p className="text-lg leading-relaxed relative z-10">
                To promote music education, support the craftsmanship of traditional musical instruments,
                and organize cultural events that raise resources for meaningful social initiatives.
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.div>
          </div>

          {/* Back to Home - Creative Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 group relative"
            >
              <span className="relative z-10 px-8 py-4 bg-white text-amber-600 font-semibold rounded-full shadow-lg border-2 border-amber-200 group-hover:border-amber-500 transition-all">
                Back to Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="relative h-32 mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#f59e0b" 
              fillOpacity="0.2" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  )
}