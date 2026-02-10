"use client"

import React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "kandarppatil2@gmail.com",
    href: "mailto:kandarppatil2@gmail.com",
  },

  {
    icon: MapPin,
    label: "Location",
    value: "Pune, India",
    href: "#",
  },
]

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/kandarp02", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Kandarp02", label: "GitHub" },
  // { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
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

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    // Strict email validation with comprehensive edge case handling
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/
    
    // Additional checks for edge cases
    if (!email || email.length === 0) return false
    if (email.length > 254) return false // RFC 5321 limit
    
    const localPart = email.split('@')[0]
    const domainPart = email.split('@')[1]
    
    // Local part validation
    if (!localPart || localPart.length > 64) return false
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false
    if (localPart.includes('..')) return false
    if (/[^\w.\-@]/.test(email)) return false // Only allowed characters
    
    // Domain validation
    if (!domainPart || domainPart.length > 253) return false
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) return false
    if (domainPart.includes('..')) return false
    
    // Domain must have at least one dot
    const domainLabels = domainPart.split('.')
    if (domainLabels.length < 2) return false
    
    // Each domain label validation
    for (const label of domainLabels) {
      if (!label || label.length > 63) return false
      if (label.startsWith('-') || label.endsWith('-')) return false
      if (!/^[a-zA-Z0-9-]+$/.test(label)) return false
    }
    
    // Top-level domain validation
    const tld = domainLabels[domainLabels.length - 1]
    if (tld.length < 2) return false
    if (!/^[a-zA-Z]{2,}$/.test(tld)) return false
    
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone || phone.length === 0) return false
    
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    
    // Check if it contains only digits and optional +
    if (!/^[+]?\d+$/.test(cleanPhone)) return false
    
    // Remove + for length validation
    const digitsOnly = cleanPhone.replace(/^\+/, '')
    
    // Strict length validation
    // 10 digits for local numbers, 11-15 for international numbers
    if (digitsOnly.length < 10 || digitsOnly.length > 15) return false
    
    // Validate format patterns
    const validPatterns = [
      /^\+\d{1,3}[-\s]?\d{10}$/, // +91 9876543210, +1-1234567890
      /^\+\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, // +91 987-654-3210
      /^\d{10}$/, // 9876543210
      /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, // 987-654-3210, 987 654 3210
      /^\(\d{3}\)[- ]?\d{3}[- ]?\d{4}$/, // (987) 654-3210
    ]
    
    // Check if phone matches any valid pattern
    const isValidPattern = validPatterns.some(pattern => pattern.test(phone))
    
    if (!isValidPattern) return false
    
    // Additional validation for Indian numbers (if starting with +91)
    if (phone.startsWith('+91') || phone.startsWith('91')) {
      const indianDigits = phone.replace(/[^\d]/g, '').replace(/^91/, '')
      // Indian numbers must start with 6,7,8, or 9 and be exactly 10 digits
      if (indianDigits.length !== 10) return false
      if (!/^[6-9]\d{9}$/.test(indianDigits)) return false
    }
    
    // Prevent invalid sequences
    const invalidSequences = [
      '0000000000', '1111111111', '2222222222', '3333333333',
      '4444444444', '5555555555', '6666666666', '7777777777',
      '8888888888', '9999999999', '1234567890', '0987654321'
    ]
    
    if (invalidSequences.includes(digitsOnly)) return false
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    
    // Client-side validation
    const newErrors: { email?: string; phone?: string } = {}
    
    if (!validateEmail(email)) {
      if (!email) {
        newErrors.email = 'Email address is required'
      } else if (email.length > 254) {
        newErrors.email = 'Email address is too long (max 254 characters)'
      } else if (!email.includes('@')) {
        newErrors.email = 'Email must contain @ symbol'
      } else if (email.startsWith('@') || email.endsWith('@')) {
        newErrors.email = '@ symbol cannot be at start or end'
      } else if (email.includes('..')) {
        newErrors.email = 'Email cannot contain consecutive dots'
      } else if (email.split('@')[0].startsWith('.') || email.split('@')[0].endsWith('.')) {
        newErrors.email = 'Email cannot start or end with dot'
      } else if (!email.split('@')[1] || !email.split('@')[1].includes('.')) {
        newErrors.email = 'Invalid domain format'
      } else if (/[^\w.\-@]/.test(email)) {
        newErrors.email = 'Email contains invalid characters'
      } else {
        newErrors.email = 'Please enter a valid email address'
      }
    }
    
    if (!validatePhone(phone)) {
      if (!phone) {
        newErrors.phone = 'Phone number is required'
      } else if (/[^\d\s\-\(\)\+]/.test(phone)) {
        newErrors.phone = 'Phone can only contain digits, spaces, and + - ( )'
      } else if (phone.replace(/[^\d]/g, '').length < 10) {
        newErrors.phone = 'Phone number must have at least 10 digits'
      } else if (phone.replace(/[^\d]/g, '').length > 15) {
        newErrors.phone = 'Phone number is too long (max 15 digits)'
      } else if (phone.startsWith('+91') || phone.startsWith('91')) {
        const indianDigits = phone.replace(/[^\d]/g, '').replace(/^91/, '')
        if (indianDigits.length !== 10) {
          newErrors.phone = 'Indian phone numbers must have exactly 10 digits'
        } else if (!/^[6-9]/.test(indianDigits)) {
          newErrors.phone = 'Indian mobile numbers must start with 6, 7, 8, or 9'
        } else {
          newErrors.phone = 'Invalid Indian phone number format'
        }
      } else {
        newErrors.phone = 'Please enter a valid phone number (e.g., +91 9876543210)'
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }
    
    try {
      // Using Formspree - replace YOUR_FORM_ID with your actual form ID
      const response = await fetch('https://formspree.io/f/xwvqgdzl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.ok) {
        setIsSubmitted(true)
        e.currentTarget.reset()
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you soon.",
        })
      } else {
        const errorMessage = data.error || 'Failed to send message'
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      })
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let{"'"}s Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I{"'"}d love
              to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
              {/* Info cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 glass rounded-2xl group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect with me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability status */}
              <Card className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Currently Available</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I{"'"}m currently taking on new projects and open to discussing
                  full-time opportunities.
                </p>
              </Card>
            </motion.div>

            {/* Contact form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <Card className="glass p-8 md:p-10 rounded-3xl">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. I{"'"}ll get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-full"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Client Name"
                          required
                          className="bg-secondary/50 border-border/50 rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="client@gmail.com"
                          required
                          className={`bg-secondary/50 border-border/50 rounded-xl h-12 ${
                            errors.email ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                          onChange={() => setErrors(prev => ({ ...prev, email: undefined }))}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Contact Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 7249743220"
                          required
                          className={`bg-secondary/50 border-border/50 rounded-xl h-12 ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : ''
                          }`}
                          onChange={() => setErrors(prev => ({ ...prev, phone: undefined }))}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Project Inquiry"
                          required
                          className="bg-secondary/50 border-border/50 rounded-xl h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Type your message"
                        required
                        rows={6}
                        className="bg-secondary/50 border-border/50 rounded-xl resize-none"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-xl h-14 text-lg glow"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
