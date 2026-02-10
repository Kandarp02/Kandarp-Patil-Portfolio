"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Briefcase, GraduationCap, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

const workExperiences = [
   {
    type: "work",
    title: "Software Development Cell Member",
    company: "Government College Of Engineering",
    location: "Jalgaon, India",
    period: "2024-present",
    highlights: [
      "Contributed to building and maintaining software projects as an active member of the college Software Development Cell."     
    ]
  },

  {
    type: "work",
    title: "Full Stack Java Intern",
    company: "Sumago Infotech, Pvt. Ltd.",
    location: "Nashik, India",
    period: "2023",
    highlights: [
      "Developed hands-on experience in real-world software development, improved coding practices.",
      "Learned to work in a professional team environment while contributing to live projects.",
     
    ]
  }
]

const achievements = [
  { icon: Award, value: "3x", label: "Hackathon Winner" },
  { icon: Briefcase, value: "50+", label: "Projects Delivered" },
  { icon: GraduationCap, value: "10+", label: "Certifications" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

function TimelineItem({
  experience,
  index,
  isLast,
}: {
  experience: typeof workExperiences[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const isWork = experience.type === "work"

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start"
    >
      {/* Left content (even items) or empty */}
      <div className={`hidden md:block ${index % 2 === 0 ? "text-right" : ""}`}>
        {index % 2 === 0 && (
          <TimelineCard experience={experience} isInView={isInView} align="right" />
        )}
      </div>

      {/* Center timeline */}
      <div className="absolute left-0 md:relative flex flex-col items-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
            isWork ? "bg-accent" : "bg-accent"
          }`}
        >
          {isWork ? (
            <Briefcase className="w-5 h-5 text-primary-foreground" />
          ) : (
            <GraduationCap className="w-5 h-5 text-accent-foreground" />
          )}
        </motion.div>

        {/* Connecting line */}
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-0.5 bg-accent flex-1 min-h-[100px]"
        />
      </div>

      {/* Right content (odd items) or mobile content */}
      <div className={`${index % 2 === 1 ? "hidden md:block" : "md:hidden"}`}>
        {index % 2 === 1 && (
          <TimelineCard experience={experience} isInView={isInView} align="left" />
        )}
      </div>

      {/* Mobile content */}
      <div className="md:hidden">
        <TimelineCard experience={experience} isInView={isInView} align="left" />
      </div>

      {/* Desktop alternating - show on correct side */}
      <div className={`hidden ${index % 2 === 0 ? "" : "md:block"}`}>
        {index % 2 === 0 && <div />}
      </div>
    </motion.div>
  )
}

function TimelineCard({
  experience,
  isInView,
  align,
}: {
  experience: typeof workExperiences[0]
  isInView: boolean
  align: "left" | "right"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? 30 : -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Card className="glass p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
        <div className="text-left">
          <span className="text-sm text-primary font-medium">
            {experience.period}
          </span>
          <h3 className="text-xl font-semibold mt-1">{experience.title}</h3>
          <p className="text-muted-foreground mt-1">
            {experience.company} • {experience.location}
          </p>
         

          {/* Highlights */}
          <ul className="mt-4 space-y-2">
            {experience.highlights.map((highlight, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My professional journey and academic background that shaped my
              expertise in software development.
            </p>
          </motion.div>

          

          {/* Timeline */}
          <div className="space-y-8">
            {workExperiences.map((experience, index) => (
              <TimelineItem
                key={experience.title + experience.company}
                experience={experience}
                index={index}
                isLast={index === workExperiences.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
