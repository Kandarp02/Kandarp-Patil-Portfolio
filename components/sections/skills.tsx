"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const skillCategories = [
  {
    title: "Frontend",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React.js", level: 80, icon: "/techno_icons/react.png" },
      { name: "Javascript", level: 85, icon: "/techno_icons/javascript.png" },
      { name: "HTML5", level: 90, icon: "/techno_icons/html5.png" },
      { name: "CSS3", level: 75, icon: "/techno_icons/css.jpg" },
      { name: "Tailwind CSS", level: 70, icon: "/techno_icons/tailwindcss.png" },
    ],
  },
  {
    title: "Backend",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 80, icon: "/techno_icons/node.png" },
       { name: "Express.js", level: 80, icon: "/techno_icons/express.png" },
       { name: "MongoDB", level: 85, icon: "/techno_icons/mongo_db.png" },
      { name: "MySQL", level: 90, icon: "/techno_icons/mysql.png" },
      { name: "Java", level: 85, icon: "/techno_icons/java.png" },
      { name: "Python", level: 80, icon: "/techno_icons/python.png" },
    ],
  },
  {
    title: "Development Tools & Platforms",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", level: 75, icon: "/techno_icons/git.png" },
      { name: "Github", level: 80, icon: "/techno_icons/github.png" },
      { name: "Vercel", level: 70, icon: "/techno_icons/vercel.png" },
    ],
  },
]

const technologies = [
  { name: "React", icon: "/techno_icons/react.png" },
  { name: "Node.js", icon: "/techno_icons/node.png" },
  { name: "Next.js", icon: "/techno_icons/nextjs.png" },
   { name: "MongoDB", icon: "/techno_icons/mongo_db.png" },
   { name: "Tailwind", icon: "/techno_icons/tailwindcss.png" },
  { name: "Python", icon: "/techno_icons/python.png" },
  {name: "Java",icon:"/techno_icons/java.png" },
  {name: "C++", icon:"/techno_icons/cpp.png" },
  {name: "C", icon:"/techno_icons/c-lang.png" },
  {name: "PHP", icon:"/techno_icons/php.png" },
  {name: "HTML", icon:"/techno_icons/html5.png" },
  {name: "CSS", icon:"/techno_icons/css.jpg" },
  {name: "Android", icon:"/techno_icons/android (1).png" },
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

function SkillBar({ name, level, delay, icon }: { name: string; level: number; delay: number; icon?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          {icon && (
            <Image 
              src={icon} 
              alt={name} 
              width={20} 
              height={20} 
              className="object-contain"
            />
          )}
          <span className="font-medium">{name}</span>
        </div>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
    </div>
  )
}



export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies I use to build
              exceptional digital experiences.
            </p>
          </motion.div>

          {/* Tech icons marquee */}
          <motion.div
            variants={itemVariants}
            className="mb-20 overflow-hidden"
          >
            <div className="flex gap-8 animate-marquee min-w-max">
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-full whitespace-nowrap"
                >
                  <Image 
                    src={tech.icon} 
                    alt={tech.name} 
                    width={24} 
                    height={24} 
                    className="object-contain"
                  />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="glass p-8 rounded-3xl h-full">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <div className="space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                        delay={categoryIndex * 0.2 + skillIndex * 0.1}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>


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
          animation: marquee 15s linear infinite;
        }
        
        /* Faster speed for mobile devices */
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 8s linear infinite;
            width: max-content;
          }
        }
      `}</style>
    </section>
  )
}
