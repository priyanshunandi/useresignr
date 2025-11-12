"use client"

import { motion } from "framer-motion"

export const AnimatedLogo = () => {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF66EB] to-[#993D8D]"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        r
      </motion.div>
      <motion.div
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF66EB] to-[#993D8D]"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10, delay: 0.1 }}
      >
        esignr
      </motion.div>
    </motion.div>
  )
}
