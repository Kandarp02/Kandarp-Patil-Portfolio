"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Award, Calendar, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Achievement {
  id: number
  title: string
  description: string
  date: string
  location?: string
  category: string
  thumbnail: string
  images: string[]
  details: string
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Second Prize - PROJECT XPO 2026",
    description: "Secured Second Position for the project CivicConnect -- a web application for reporting and tracking civic issues; ranked among 50+ teams; awarded ₹10,000",
    date: "March 2026",
    location: "V.B.Kolte College Of Engineering, Malkapur",
    category: "Competition",
    thumbnail: "/achievements_images/1.jpeg",
    images: [
      "/achievements_images/1.jpeg",
      "/achievements_images/2.jpeg",
      "/achievements_images/3.jpeg",
      "/achievements_images/4.jpeg"

    ],
    details: "CivicConnect allows citizens to report civic issues and helps municipal workers and admins manage and resolve them efficiently. It includes real-time map-based tracking using Leaflet.js and OpenStreetMap, secure login with JWT authentication, and a responsive design for smooth use across all devices."  },
  {
    id: 2,
    title: "First Prize at Technical Quiz - ECHNO-STORM 2026",
    description: "Secured a winning position in a technical quiz at TechnoStorm, demonstrating strong knowledge of core computer science concepts, problem-solving ability, and quick analytical thinking under time constraints; awarded ₹3,000",
    date: "April 2026",
    location: "KCE College of Engineering, Jalgaon",
    category: "Competition",
    thumbnail: "/achievements_images/5.jpeg",
    images: [
      "/achievements_images/5.jpeg",
      "/achievements_images/6.jpeg",
    ],
    details: ""
  },
  {
    id: 3,
    title: "First Prize at Technical Paper Presentation - TECHNO-STORM 2026",
    description: "Secured a winning position in a technical paper presentation on AI in Healthcare, demonstrating strong research, understanding of AI applications in healthcare, and clear communication of complex concepts; awarded ₹3,000",
    date: "April 2026",
    location: "KCE College of Engineering, Jalgaon",
    category: "Competition",
    thumbnail: "/achievements_images/7.jpeg",
    images: [
      "/achievements_images/7.jpeg",
      "/achievements_images/8.jpeg",
    ],
    details: ""
  },
  {
    id: 4,
    title: "Second Prize at Technical Debate - BIZINTELL 2026",
    description: "Secured 2nd place in a technical debate, demonstrating strong communication, critical thinking, and the ability to present and defend technical viewpoints effectively; awarded ₹1,000",
    date: "April 2026",
    location: "KCE College of Engineering, Jalgaon",
    category: "Competition",
    thumbnail: "/achievements_images/11.jpeg",
    images: [
      "/achievements_images/11.jpeg",
      "/achievements_images/12.jpeg",
     "/achievements_images/13.jpeg",
    ],
    details: ""
  },
 
   {
    id: 5,
    title: "First Prize at Internal SIH Hackathon Competition",
    description: "Secured 1st place in the internal Smart India Hackathon (SIH) with AgriSarthi, an innovative solution aimed at supporting farmers.",
    date: "Sept 2025",
    location: "Government College of Engineering, Jalgaon",
    category: "Competition",
    thumbnail: "/achievements_images/9.jpeg",
    images: [
      "/achievements_images/9.jpeg",
      "/achievements_images/10.jpeg",
    ],
    details: "AgriSarthi focuses on providing smart agricultural assistance, helping farmers with better decision-making, improved productivity, and access to useful information. Demonstrated strong problem-solving, teamwork, and development skills under time constraints."
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

function AchievementCard({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="relative overflow-hidden rounded-2xl glass h-full">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
          <Image
            src={achievement.thumbnail}
            alt={achievement.title}
            fill
            className="object-contain transition-transform duration-500 hover:scale-105 bg-muted/50"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.jpg'
            }}
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3 z-20">
            <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
              {achievement.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {achievement.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {achievement.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{achievement.date}</span>
            </div>
            {achievement.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{achievement.location}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center text-primary text-sm font-medium">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto slideshow timer - changes every 3 seconds
  useEffect(() => {
    if (achievement.images.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % achievement.images.length)
    }, 1000)

    return () => clearInterval(timer)
  }, [achievement.images.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % achievement.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + achievement.images.length) % achievement.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="relative h-64 md:h-96 bg-muted">
          <Image
            src={achievement.images[currentImageIndex]}
            alt={`${achievement.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-contain bg-muted/50"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.jpg'
            }}
          />

          {/* Navigation Arrows */}
          {achievement.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/80 text-sm">
            {currentImageIndex + 1} / {achievement.images.length}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {achievement.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">{achievement.title}</h2>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{achievement.date}</span>
            </div>
            {achievement.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{achievement.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg leading-relaxed mb-4">{achievement.description}</p>
            <p className="text-muted-foreground leading-relaxed">{achievement.details}</p>
          </div>

          {/* Thumbnail Gallery */}
          {achievement.images.length > 1 && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Gallery</h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {achievement.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      idx === currentImageIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain bg-muted/50"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder.jpg'
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [showAll, setShowAll] = useState(false)
  
  const displayedAchievements = showAll ? achievements : achievements.slice(0, 4)

  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Accomplishments</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="block gradient-text glow-text">Achievements</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of my accomplishments, awards, and recognitions throughout my academic and professional journey.
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={() => setSelectedAchievement(achievement)}
              />
            ))}
          </div>
          
          {/* View More/Less Button */}
          {achievements.length > 4 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {showAll ? 'View Less' : 'View More Achievements'}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
