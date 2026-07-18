'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Music, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const footerLinks = {
  quickLinks: [
    { href: '/about', label: 'About Us' },
    { href: '/music-education', label: 'Music Education' },
    { href: '/instrument-production', label: 'Instrument Production' },
    { href: '/events-fundraising', label: 'Events' },
  ],
  getInvolved: [
    { href: '/get-involved', label: 'Donate' },
    { href: '/get-involved', label: 'Volunteer' },
    { href: '/get-involved', label: 'Partner' },
  ],
  contact: [
    { icon: Mail, text: 'info@globalinfinity.org' },
    { icon: Phone, text: '+91 12345 67890' },
    { icon: MapPin, text: 'India' },
  ]
}

export default function Footer() {
  const [imageError, setImageError] = useState(false)

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block group mb-4">
              {!imageError ? (
                <div className="relative">
                  <Image
                    src="/assets/images/2.png"
                    alt="Global Infinity Foundation Logo"
                    width={200}
                    height={60}
                    className="h-12 w-auto object-contain mb-2"
                    onError={() => setImageError(true)}
                  />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:to-yellow-500 transition-all duration-300">
                    Global Infinity
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:w-full transition-all duration-300"></div>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering communities through music, craftsmanship, and cultural events.
            </p>
            <div className="flex items-center gap-2 text-amber-400">
              <Music className="w-4 h-4" />
              <span className="text-sm">Since 2010</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get Involved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Contact</h4>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-400 group">
                  <item.icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm group-hover:text-amber-400 transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Global Infinity Foundation. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-amber-500 animate-pulse" /> for music
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}