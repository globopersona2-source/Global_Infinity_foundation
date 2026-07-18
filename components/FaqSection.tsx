'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  { q: 'How can I donate?', a: 'You can donate through our Get Involved page or contact us directly.' },
  { q: 'Can I volunteer?', a: 'Absolutely! We welcome volunteers for events, teaching, and administration.' },
  { q: 'What skill level do I need to start music classes?', a: 'Our programs cater to all levels, from beginners to advanced.' },
  { q: 'Do you support instrument makers?', a: 'Yes, we collaborate with artisans to promote traditional craftsmanship.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function FaqSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-light text-[#2C3E50] mb-4">Frequently Asked Questions</h2>
        <div className="w-20 h-1 bg-[#00A8FF] mx-auto"></div>
      </motion.div>

      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        {faqs.map((faq, idx) => (
          <AccordionItem 
            key={idx} 
            value={`item-${idx}`}
            className="border-b border-gray-200"
          >
            <AccordionTrigger className="text-[#2C3E50] hover:text-[#00A8FF] py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}