"use client"

import { useState, useEffect } from "react"
import { LightbulbIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const quotes = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
    author: "Steve Jobs",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Choose a job you love, and you will never have to work a day in your life.",
    author: "Confucius",
  },
  {
    text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    author: "Steve Jobs",
  },
  {
    text: "Success isn't about how much money you make; it's about the difference you make in people's lives.",
    author: "Michelle Obama",
  },
  {
    text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer",
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    text: "Your career is like a garden. It can hold an assortment of life's energy that yields a bounty for you.",
    author: "Lisa Hartley",
  },
  {
    text: "Take care of your mind, your body will thank you. Take care of your body, your mind will thank you.",
    author: "Debbie Hampton",
  },
  {
    text: "Work-life balance is not an entitlement or benefit. Your company cannot give it to you. You have to create it for yourself.",
    author: "Matthew Kelly",
  },
]

export function DynamicQuote() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-6 flex items-start gap-3 rounded-lg p-4">
      <LightbulbIcon className="mt-1 h-5 w-5 shrink-0 text-[#9c4dcc]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <p className="text-sm italic text-gray-600">{quotes[currentQuoteIndex].text}</p>
          <span className="mt-1 text-xs text-gray-500">— {quotes[currentQuoteIndex].author}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
