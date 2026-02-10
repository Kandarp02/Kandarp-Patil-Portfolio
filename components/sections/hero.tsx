"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, Mail, FileDown, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"

const Hero3DScene = dynamic(() => import("@/components/hero-3d-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
  ),
})

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@alexchen.dev", label: "Email" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Hero3DScene />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-left">
            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-12 mt-16"
            >
              <span className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Hello, I am</span>
              <span className="block gradient-text glow-text mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Kandarp Patil</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light">
                <span className="text-foreground font-medium">Full Stack Developer</span>
                <span className="mx-3 text-primary">|</span>
                <span>Building Digital Experiences</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              I develop scalable and high-performance web applications with a focus on clean architecture, usability,
              and long-term maintainability. I enjoy solving real-world problems by building reliable systems and enhancing
              them with intelligent features.
            </motion.p>

            {/* Education Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>B.Tech Computer Engineering • Government College Of Engineering</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start gap-4 mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full glow"
                  asChild
                >
                  <a href="/kandarp-resume.pdf" download="Kandarp_Patil_Resume.pdf">
                    <FileDown className="w-5 h-5 mr-2" />
                    Resume
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full glow"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 scale-110" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/kandarp-patil.png"
                    alt="Kandarp Patil"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Open to Work Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 px-4 py-2 glass rounded-full text-sm font-medium shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Open to Work
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-sm font-medium">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    </section>
  )
}
