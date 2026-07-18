'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const instructors = [
  { name: 'Eric Martinetti', instrument: 'Violin', year: '2018', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'David Butler', instrument: 'Guitar', year: '2020', image: 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'George White', instrument: 'Bass', year: '2020', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Andy Hall', instrument: 'Drums', year: '2020', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
]

export default function InstructorGrid() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-light text-[#2C3E50] mb-4">Our Instructors</h2>
        <div className="w-20 h-1 bg-[#00A8FF] mx-auto"></div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {instructors.map((person, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden mb-4 bg-gray-100">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-[#2C3E50] text-center">{person.name}</h3>
            <p className="text-sm text-gray-500 text-center">
              {person.instrument} • {person.year}
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <Button 
          variant="outline"
          className="border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white px-8 rounded-sm"
        >
          View All Instructors
        </Button>
      </div>
    </section>
  )
}