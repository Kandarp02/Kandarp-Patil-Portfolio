"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Briefcase, Award, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const certificates = [
  { name: "Android Development", image: "/certificates/android.jpg" },
  { name: "Achievement Award", image: "/certificates/award.jpg" },
  { name: "C Programming", image: "/certificates/c certificate.jpg" },
  { name: "C++ Programming", image: "/certificates/c++.jpg" },
  { name: "Java Programming", image: "/certificates/java.jpg" },
  { name: "JavaScript", image: "/certificates/javasc.jpg" },
  { name: "NPTEL Java", image: "/certificates/nptel java.jpg" },
  { name: "Sumago Infotech", image: "/certificates/sumago.jpg" },
]

const educationExperiences = [
  {
    type: "education",
    title: "B.Tech in Computer Engineering",
    company: "Government College Of Engineering",
    location: "Jalgaon, India",
    period: "2024-present",
    highlights: [
      "Studied core computer science concepts with a focus on DSA and web development.",
      "Actively working on full-stack and AI-based projects." 
      
    ]
  },

  {
    type: "education",
    title: "Diploma In Computer Engineering",
    company: "Government Polytechnic",
    location: "Jalgaon, India",
    period: "2021 - 2024",
    highlights: [
       "Built a strong foundation in programming, web technologies, databases, and computer fundamentals",
       "Completed multiple academic and real-world projects during diploma."
    ] 
  },

  {
    type: "education",
    title: "10th Grade (CBSE)",
    company: "St. Joseph's Convent School",
    location: "Jalgaon, India",
    period: "2020-21",
    highlights: [
    "Developed core skills in maths, science, and logical reasoning for an engineering pathway.",
    "Participated in extracurricular activities, fostering teamwork and leadership skills.",
    "Received recognition for academic excellence and leadership.",
      
    ]
  },
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
  experience: typeof educationExperiences[0]
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
            isWork ? "bg-primary" : "bg-accent"
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
  experience: typeof educationExperiences[0]
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

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleDownload = (imagePath: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = imagePath
    link.download = `${fileName.replace(/\s+/g, '_').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="education" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Academic <span className="gradient-text">Education</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My educational journey that shaped my foundation in computer engineering
              and technology.
            </p>
          </motion.div>

         

          {/* Timeline */}
          <div className="space-y-8">
            {educationExperiences.map((experience, index) => (
              <TimelineItem
                key={experience.title + experience.company}
                experience={experience}
                index={index}
                isLast={index === educationExperiences.length - 1}
              />
            ))}
          </div>

          {/* Floating Certificates */}
          <motion.div variants={itemVariants} className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Professional Certifications</h3>
              <p className="text-muted-foreground">Click on any certificate to download</p>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex gap-8 animate-marquee">
                {[...certificates, ...certificates].map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group cursor-pointer"
                    onClick={() => handleDownload(cert.image, cert.name)}
                  >
                    <div className="relative overflow-hidden rounded-xl glass p-2 hover:shadow-lg transition-shadow duration-300">
                      <div className="relative w-32 h-24 md:w-40 md:h-30">
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          fill
                          className="object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                          <Download className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-xs text-center mt-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
