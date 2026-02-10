"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


const projects = [
  {
    id: 1,
    title: "Crop-Trading Manager",
    description:
      "A custom-built, full-stack web application developed for Chamunda Mata Traders to streamline inventory management, billing, payment tracking (full, partial, and repayments), and real-time income reporting through a secure, multi-godown PHP–MySQL system.",
    image: "/project_screenshots/1.png",
    category: "Web Apps",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "XAMPP", "MySQL","PHPMyAdmin", "Chart.js","Font Awesome","AOS"],
    liveUrl: "#",
    githubUrl: "https://github.com/Kandarp02/Crop-Trading-Manager",
    featured: true,
  },

    {
    id: 2,
    title: "TalkSpace-Video-Conferencing-WebApp",
    description:
      "An advanced video conferencing web application built using Django that allows users to create and join meetings with unlimited duration, screen sharing, live chat, participant management, and admin analytics — designed as a secure and cost-effective alternative to premium meeting platforms.",
    image: "/project_screenshots/2.png",
    category: "Web Apps",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Python Django", "Zego-Cloud API"],
    // liveUrl: "#",
    githubUrl: "https://github.com/Kandarp02/TalkSpace-Video-Conferencing-WebApp",
    featured: true,
  },

   {
    id: 3,
    title: "Canteen Management System",
    description:
    "Java-based Canteen Management System developed during industrial training at Sumago Infotech Pvt. Ltd. using Java, Advanced Java, Swing, AWT, JSP, JDBC, and MySQL. The desktop application manages users, products, packages, and records while following SDLC principles and real-world development practices.",
    image: "/project_screenshots/3.png",
    category: "Desktop Application",
    tags: ["Java", "Swing", "AWT", "JSP", "JDBC", "MySQL"],
    // liveUrl: "#",
    githubUrl: "https://github.com/Kandarp02/Industrial-Training-Project-Canteen-Management-System",
    featured: true,
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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="relative overflow-hidden rounded-3xl glass">
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="md:w-1/2 h-48 md:h-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
            {/* Actual project image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                // Fallback to emoji will be visible underneath
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-20">
                {project.category === "AI/ML" ? "🤖" : project.category === "Mobile" ? "📱" : project.category === "Open Source" ? "⚡" : "🌐"}
              </span>
            </div>
            
            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
            >
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 rounded-full bg-secondary hover:scale-110 transition-transform"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                Featured
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                  {project.category}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of projects I{"'"}ve worked on, showcasing my expertise
              in building modern web applications.
            </p>
          </motion.div>


          {/* Projects grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
