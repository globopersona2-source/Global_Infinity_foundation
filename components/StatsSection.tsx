'use client'

import { motion } from 'framer-motion'
import { Users, Award, Music } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained' },
  { icon: Award, value: '30+', label: 'Artisans Supported' },
  { icon: Music, value: '50+', label: 'Events Organized' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-[#00A8FF]" />
              <div className="text-3xl font-bold text-[#2C3E50] mb-2">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}