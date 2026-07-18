'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/music-education', label: 'Music Education' },
  { href: '/instrument-production', label: 'Instrument Production' },
  { href: '/events-fundraising', label: 'Events & Fundraising' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-amber-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo with hover animation */}
        <Link href="/" className="group relative flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Image
              src="/assets/images/1.png"
              alt="Global Infinity Foundation Logo"
              width={980}
              height={500}
              className="h-10 w-auto object-contain"
              priority
            />
          </motion.div>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group"
            >
              <span className="text-sm font-medium text-gray-600 group-hover:text-amber-600 transition-all duration-300">
                {link.label}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-amber-600 hover:text-amber-700 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          suppressHydrationWarning
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="container mx-auto px-4 md:hidden pb-4"
        >
          <nav className="flex flex-col gap-2 border border-amber-200 rounded-lg p-4 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-sm font-medium text-gray-600 group-hover:text-amber-600 transition-all duration-300">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}