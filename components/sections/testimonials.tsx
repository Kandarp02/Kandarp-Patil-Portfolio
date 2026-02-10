"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    content:
      "Alex is an exceptional developer who consistently delivers high-quality work. Their ability to understand complex requirements and translate them into elegant solutions is remarkable. Our project was completed ahead of schedule and exceeded all expectations.",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at InnovateCo",
    content:
      "Working with Alex was a game-changer for our startup. Their technical expertise combined with excellent communication skills made the development process smooth and efficient. I highly recommend them for any challenging project.",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager at ScaleUp",
    content:
      "Alex brought our vision to life with their incredible attention to detail and creative problem-solving. They went above and beyond to ensure every feature was polished and user-friendly. A true professional!",
    avatar: "ER",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder at AppWorks",
    content:
      "The quality of work and professionalism Alex brings to every project is outstanding. They have an amazing ability to break down complex problems and deliver clean, maintainable code. Would definitely work with them again!",
    avatar: "DK",
    rating: 5,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000)
    return () => clearInterval(timer)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  }

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-40" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Feedback from clients and colleagues I{"'"}ve had the pleasure of
              working with.
            </p>
          </motion.div>

          {/* Testimonial slider */}
          <motion.div variants={itemVariants} className="relative">
            <div className="overflow-hidden py-8">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Card className="glass p-8 md:p-12 rounded-3xl relative">
                    {/* Quote icon */}
                    <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="pt-4">
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: testimonials[currentIndex].rating }).map(
                          (_, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-yellow-500"
                            >
                              ★
                            </motion.span>
                          )
                        )}
                      </div>

                      {/* Quote text */}
                      <blockquote className="text-lg md:text-xl leading-relaxed mb-8">
                        {`"${testimonials[currentIndex].content}"`}
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-semibold text-primary-foreground">
                          {testimonials[currentIndex].avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-muted-foreground">
                            {testimonials[currentIndex].role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full glass hover:bg-primary/20 bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full glass hover:bg-primary/20 bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map((company) => (
                <span key={company} className="text-xl font-semibold">
                  {company}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
