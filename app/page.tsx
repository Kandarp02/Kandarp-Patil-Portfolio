"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Education from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />
      
      <main className="relative">
        {/* Scroll progress indicator */}
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content sections */}
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
