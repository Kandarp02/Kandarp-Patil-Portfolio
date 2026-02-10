"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Rocket, Users, Lightbulb, Coffee, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const stats = [
  { value: "10+", label: "Technologies" },
  { value: "10+", label: "Projects Completed" },
   { value: "3+", label: "Years Experience in Coaching, Mentoring and Academic Training" },
   { value: "50+", label: "Students Trained" },
]

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and exceptional user experience",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with cross-functional teams",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Staying ahead with latest technologies and trends",
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

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Crafting Solutions with{" "}
              <span className="gradient-text">Purpose</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A passionate developer dedicated to building exceptional digital
              experiences that make a difference.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left - Story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full" />
                <div className="pl-8 space-y-6">
                  <p className="text-lg leading-relaxed">
                    I{"'"}m an Aspiring Software Engineer and Full-Stack Developer based in India, 
                    with a strong focus on continuous learning and problem-solving. 
                    I specialize in full-stack web development using the MERN stack (MongoDB, Express.js, React, Node.js)
                    and actively strengthen my foundation in Data Structures & Algorithms (DSA) to build efficient, scalable applications. 
                    I enjoy writing clean, maintainable code and developing user-focused solutions.
                    </p>
                  <p className="text-muted-foreground leading-relaxed">
                   Beyond development, I also run my own coaching and tuition classes alongside my education, with 3+ years of teaching experience,
                    where I’ve successfully trained 50+ students and helped them achieve strong academic and technical outcomes. 
                   This experience has sharpened my problem-solving, communication, leadership, and mentoring skills, 
                   which I bring into every team and project I work with.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                  Whether it’s collaborating on a team project or building something from scratch,
                  I approach every challenge with curiosity, resilience, 
                  and a commitment to quality — ready to bring ideas to life in the world of tech.
                  </p>
                </div>
              </div>

              {/* Personal info */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Pune, India</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span>Coffee Enthusiast</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Stats Card */}
            <motion.div variants={itemVariants} className="relative">
              <div className="card-3d">
                <Card className="relative glass p-8 rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stats grid */}
                  <div className="relative grid grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="text-center p-4"
                      >
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-6 -right-6 w-20 h-20 glass rounded-2xl flex items-center justify-center"
              >
                <Code2 className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-6 -left-6 w-16 h-16 glass rounded-2xl flex items-center justify-center"
              >
                <Rocket className="w-6 h-6 text-accent" />
              </motion.div>
            </motion.div>
          </div>

          {/* Highlights grid */}
          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="glass p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
