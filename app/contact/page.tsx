'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, Sparkles, ArrowRight, Clock, Github, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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

// Floating Element Component
function FloatingElement({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 6,
        repeat: Infinity,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-purple-50 to-rose-50 min-h-screen overflow-hidden">
      {/* Hero Section - Split Screen */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <FloatingElement delay={0} className="absolute top-20 left-10 text-amber-300/30">
          <MessageCircle size={60} />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute bottom-20 right-10 text-rose-300/30">
          <Mail size={80} />
        </FloatingElement>
        <FloatingElement delay={4} className="absolute top-40 right-20 text-purple-300/30">
          <Phone size={50} />
        </FloatingElement>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                variants={scaleUp}
                className="inline-block"
              >
                <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider shadow-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  GET IN TOUCH
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={slideInLeft}
                className="text-5xl md:text-6xl lg:text-7xl font-black"
              >
                <span className="bg-gradient-to-r from-amber-700 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Let's
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Connect
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-700 max-w-md leading-relaxed"
              >
                We welcome your interest in Global Infinity Foundation. If you would like to support our
                initiatives, collaborate with us, or learn more about our programs, please reach out.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                variants={fadeUp}
                className="flex gap-6 pt-4"
              >
                {[
                  { label: 'Response Time', value: '< 24h', icon: Clock },
                  { label: 'Happy Clients', value: '500+', icon: Mail },
                  { label: 'Years', value: '15+', icon: MapPin },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-3xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Contact us"
                  width={600}
                  height={400}
                  className="object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Floating Card */}
                <FloatingElement delay={1} className="absolute -bottom-6 -left-6">
                  <div className="bg-white rounded-2xl shadow-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Email us at</div>
                        <div className="text-sm font-semibold text-gray-900">info@globalinfinity.org</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards - Modern Design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Email Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <TiltCard>
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-amber-100 group h-full">
                  <div className="relative">
                    {/* Background Icon */}
                    <Mail className="absolute -right-4 -top-4 w-24 h-24 text-amber-100 group-hover:text-amber-200 transition-colors" />
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Mail className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-500 mb-4 text-sm">Send us an email anytime</p>
                    <p className="text-lg font-semibold text-amber-600 break-all">
                      info@globalinfinityfoundation.org
                    </p>

                    {/* Hover Indicator */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <TiltCard>
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-purple-100 group h-full">
                  <div className="relative">
                    <Phone className="absolute -right-4 -top-4 w-24 h-24 text-purple-100 group-hover:text-purple-200 transition-colors" />
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Phone className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-500 mb-4 text-sm">Call us during business hours</p>
                    <p className="text-lg font-semibold text-purple-600">
                      +91 12345 67890
                    </p>

                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={scaleUp}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <TiltCard>
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-rose-100 group h-full">
                  <div className="relative">
                    <MapPin className="absolute -right-4 -top-4 w-24 h-24 text-rose-100 group-hover:text-rose-200 transition-colors" />
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-500 mb-4 text-sm">Visit our headquarters</p>
                    <p className="text-lg font-semibold text-rose-600">
                      India
                    </p>

                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-500 to-red-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-gradient-to-b from-amber-100/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInLeft}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      placeholder="Your message here..."
                      required
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Map / Location Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideInRight}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 h-64 relative overflow-hidden group">
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Map"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent"></div>
                </div>
                
                {/* Location Marker */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-xl z-10"
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h4>
                <div className="space-y-2">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-semibold text-amber-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Twitter, color: 'bg-blue-500', hover: 'bg-blue-600' },
                    { icon: Linkedin, color: 'bg-blue-700', hover: 'bg-blue-800' },
                    { icon: Instagram, color: 'bg-pink-500', hover: 'bg-pink-600' },
                    { icon: Github, color: 'bg-gray-800', hover: 'bg-gray-900' },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 ${social.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all`}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about reaching out to us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How quickly do you respond?',
                a: 'We typically respond within 24 hours during business days.'
              },
              {
                q: 'Do you have a physical office?',
                a: 'Yes, our headquarters is located in India. Visit us during office hours.'
              },
              {
                q: 'Can I schedule a meeting?',
                a: 'Absolutely! Send us an email and we\'ll arrange a convenient time.'
              },
              {
                q: 'Do you accept collaborations?',
                a: 'We love collaborations! Reach out to discuss partnership opportunities.'
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={scaleUp}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-amber-600 via-rose-600 to-purple-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"
            />

            <div className="relative z-10 text-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start a Conversation?</h3>
              <p className="text-white/90 mb-8 max-w-xl mx-auto">
                Whether you have a question about our programs or want to discuss collaboration opportunities, we're here to help.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="#"
                  className="bg-white text-amber-600 px-10 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-2"
                >
                  Contact Us Now
                  <ArrowRight className="w-4 h-4" />
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