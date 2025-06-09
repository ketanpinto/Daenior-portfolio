"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Camera,
  Film,
  Star,
  Mail,
  Phone,
  MapPin,
  Youtube,
  Instagram,
  Twitter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ParticleBackground from "@/components/particle-background"
import { cn } from "@/lib/utils"

// Portfolio items data
const portfolioItems = [
  {
    id: 1,
    title: "Epic Gaming Montage",
    description: "High-energy gaming compilation with dynamic transitions and sync editing",
    category: "youtube",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Travel Vlog Series",
    description: "Cinematic travel footage with color grading and smooth transitions",
    category: "youtube",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Product Photography",
    description: "Professional product shots with dramatic lighting and composition",
    category: "photography",
    rating: 5.0,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Music Video Edit",
    description: "Rhythmic editing with visual effects synchronized to the beat",
    category: "client",
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Portrait Collection",
    description: "Artistic portrait photography with mood lighting and post-processing",
    category: "photography",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Brand Commercial",
    description: "Polished commercial edit with professional color grading and motion graphics",
    category: "client",
    rating: 5.0,
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Testimonials data
const testimonials = [
  {
    name: "Alex Gaming",
    channel: "1.2M Subscribers",
    text: "Incredible work! My videos have never looked better. The editing style perfectly matches my brand and the turnaround time is amazing.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sarah Vlogs",
    channel: "850K Subscribers",
    text: "Professional, creative, and always delivers beyond expectations. My engagement rates have increased significantly since working together.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Tech Reviews Pro",
    channel: "2.1M Subscribers",
    text: "The attention to detail is outstanding. Every video feels like a cinematic experience. Highly recommend for any serious content creator.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Gaming Legends",
    channel: "3.5M Subscribers",
    text: "The cinematic quality added to my gaming videos has completely transformed my channel. Subscribers constantly comment on how professional everything looks.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [lightbox, setLightbox] = useState({ open: false, item: null })
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  // Handle scroll events for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false)
      } else {
        setIsNavVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Initialize GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero animations
    gsap.fromTo(
      ".hero-title span",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      },
    )

    gsap.fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" },
    )

    gsap.fromTo(
      ".hero-buttons",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.8, ease: "power2.out" },
    )

    // Scroll animations
    const sections = [
      { ref: aboutRef, className: ".about-section" },
      { ref: servicesRef, className: ".services-section" },
      { ref: portfolioRef, className: ".portfolio-section" },
      { ref: testimonialsRef, className: ".testimonials-section" },
      { ref: contactRef, className: ".contact-section" },
    ]

    sections.forEach((section) => {
      gsap.fromTo(
        `${section.className} .animate-in`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section.ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Parallax effect for stars
    gsap.to(".parallax-stars", {
      y: "-30%",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    // Service cards tilt effect
    const cards = document.querySelectorAll(".service-card")
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      })
    })
  }, [])

  // Filter portfolio items
  const filteredItems =
    activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)

  // Next testimonial
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  // Previous testimonial
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Navigation */}
      <motion.nav
        className={cn(
          "fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/20 transition-all duration-300",
          isNavVisible ? "translate-y-0" : "-translate-y-full",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent glow-text">
              DAENIOR
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#home" className="hover:text-red-400 transition-colors nav-link">
                Home
              </Link>
              <Link href="#about" className="hover:text-red-400 transition-colors nav-link">
                About
              </Link>
              <Link href="#services" className="hover:text-red-400 transition-colors nav-link">
                Services
              </Link>
              <Link href="#portfolio" className="hover:text-red-400 transition-colors nav-link">
                Portfolio
              </Link>
              <Link href="#contact" className="hover:text-red-400 transition-colors nav-link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center galaxy-bg overflow-hidden"
      >
        <ParticleBackground />
        <div className="parallax-stars absolute inset-0 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight hero-title overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent glow-text-strong"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                CRAFTING
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent glow-text-strong"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                STORIES
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent glow-text-strong"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                IN MOTION
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent glow-text-strong"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                & LIGHT
              </motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed hero-subtitle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Professional Video Editor & Photographer specializing in YouTube content creation, cinematic storytelling,
              and visual excellence that captivates audiences.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-buttons"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg glow-button"
              >
                <Play className="mr-2 h-5 w-5" />
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 text-lg glow-button-outline"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 px-6 relative about-section">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6 animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent glow-text">
                About Me
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full glow-line"></div>
              <p className="text-lg text-gray-300 leading-relaxed">
                With over 5 years of experience in video editing and photography, I specialize in creating compelling
                visual content for YouTube creators and digital brands. My passion lies in transforming raw footage into
                cinematic masterpieces that tell powerful stories.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From fast-paced gaming montages to emotional documentaries, I bring technical expertise and creative
                vision to every project, ensuring your content stands out in the digital landscape.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-700 glow-badge">
                  <Film className="mr-1 h-3 w-3" />
                  Video Editing
                </Badge>
                <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-700 glow-badge">
                  <Camera className="mr-1 h-3 w-3" />
                  Photography
                </Badge>
                <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-700 glow-badge">
                  <Youtube className="mr-1 h-3 w-3" />
                  YouTube Content
                </Badge>
              </div>
            </motion.div>
            <motion.div
              className="relative animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-red-800/50 glow-border">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Video Editor Portrait"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center glow-circle">
                      <Film className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">500+</h3>
                    <p className="text-red-300">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        ref={servicesRef}
        className="py-20 px-6 bg-gradient-to-b from-black to-red-950/10 services-section"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16 animate-in"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent glow-text mb-4">
              Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto glow-line"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
              Comprehensive video and photo services tailored for YouTube creators and digital content producers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 hover:border-red-600/50 transition-all duration-300 group service-card perspective">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glow-circle">
                    <Film className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Video Editing</h3>
                  <p className="text-gray-300">
                    Professional editing for YouTube videos, including color grading, audio mixing, and motion graphics
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Gaming Montages</li>
                    <li>• Vlogs & Lifestyle</li>
                    <li>• Educational Content</li>
                    <li>• Brand Commercials</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 hover:border-red-600/50 transition-all duration-300 group service-card perspective">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glow-circle">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Photography</h3>
                  <p className="text-gray-300">
                    High-quality photography services for thumbnails, portraits, and promotional content
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• YouTube Thumbnails</li>
                    <li>• Portrait Photography</li>
                    <li>• Product Photography</li>
                    <li>• Event Coverage</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 hover:border-red-600/50 transition-all duration-300 group service-card perspective">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glow-circle">
                    <Youtube className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">YouTube Optimization</h3>
                  <p className="text-gray-300">
                    Complete YouTube content strategy including thumbnails, intros, and channel branding
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Channel Branding</li>
                    <li>• Thumbnail Design</li>
                    <li>• Intro/Outro Creation</li>
                    <li>• Content Strategy</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-20 px-6 portfolio-section">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16 animate-in"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent glow-text mb-4">
              Featured Work
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto glow-line"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
              A showcase of recent projects that demonstrate creativity, technical skill, and storytelling excellence
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "border-red-500",
                  activeFilter === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "text-red-400 hover:bg-red-500 hover:text-white",
                )}
              >
                All Work
              </Button>
              <Button
                variant={activeFilter === "youtube" ? "default" : "outline"}
                onClick={() => setActiveFilter("youtube")}
                className={cn(
                  "border-red-500",
                  activeFilter === "youtube"
                    ? "bg-red-600 hover:bg-red-700"
                    : "text-red-400 hover:bg-red-500 hover:text-white",
                )}
              >
                YouTube Edits
              </Button>
              <Button
                variant={activeFilter === "photography" ? "default" : "outline"}
                onClick={() => setActiveFilter("photography")}
                className={cn(
                  "border-red-500",
                  activeFilter === "photography"
                    ? "bg-red-600 hover:bg-red-700"
                    : "text-red-400 hover:bg-red-500 hover:text-white",
                )}
              >
                Photography
              </Button>
              <Button
                variant={activeFilter === "client" ? "default" : "outline"}
                onClick={() => setActiveFilter("client")}
                className={cn(
                  "border-red-500",
                  activeFilter === "client"
                    ? "bg-red-600 hover:bg-red-700"
                    : "text-red-400 hover:bg-red-500 hover:text-white",
                )}
              >
                Client Work
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="animate-in"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <Card
                    className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 hover:border-red-600/50 transition-all duration-300 group overflow-hidden portfolio-card"
                    onClick={() => setLightbox({ open: true, item })}
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-red-900/30 to-black overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 glow-button">
                          <Play className="mr-2 h-4 w-4" />
                          {item.category === "photography" ? "View" : "Watch"}
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-red-900/30 text-red-300 border-red-700 glow-badge">
                          {item.category === "youtube"
                            ? "YouTube"
                            : item.category === "photography"
                              ? "Photography"
                              : "Client"}
                        </Badge>
                        <div className="flex items-center text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-20 px-6 bg-gradient-to-b from-black to-red-950/10 testimonials-section"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16 animate-in"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent glow-text mb-4">
              Client Testimonials
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto glow-line"></div>
            <p className="text-xl text-gray-300 mt-6">What YouTube creators say about working with me</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <Card className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 w-full neon-glow">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-red-500 glow-border">
                          <Image
                            src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                            alt={testimonials[currentTestimonial].name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xl md:text-2xl text-gray-300 italic mb-6">
                            "{testimonials[currentTestimonial].text}"
                          </p>
                          <div>
                            <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                            <p className="text-red-300">{testimonials[currentTestimonial].channel}</p>
                            <div className="flex mt-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    "w-3 h-3 p-0 rounded-full",
                    currentTestimonial === index
                      ? "bg-red-500 border-red-500"
                      : "bg-transparent border-red-500 hover:bg-red-500/50",
                  )}
                />
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-6 relative contact-section">
        <ParticleBackground density={30} />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            className="text-center mb-16 animate-in"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent glow-text mb-4">
              Let's Create Together
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto glow-line"></div>
            <p className="text-xl text-gray-300 mt-6">
              Ready to elevate your content? Get in touch to discuss your project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8 animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center glow-circle">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Email</h3>
                  <p className="text-gray-300">hello@daenior.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center glow-circle">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center glow-circle">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Location</h3>
                  <p className="text-gray-300">Los Angeles, CA</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors glow-circle"
                >
                  <Youtube className="h-5 w-5 text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors glow-circle"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors glow-circle"
                >
                  <Twitter className="h-5 w-5 text-white" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="animate-in"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-red-950/20 to-black border-red-800/30 neon-glow">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-black/50 border border-red-800/30 rounded-lg text-white placeholder-transparent focus:border-red-500 focus:outline-none peer pt-6"
                        placeholder="Your name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400"
                      >
                        Your name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-black/50 border border-red-800/30 rounded-lg text-white placeholder-transparent focus:border-red-500 focus:outline-none peer pt-6"
                        placeholder="your@email.com"
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="relative">
                      <select
                        id="project-type"
                        className="w-full px-4 py-3 bg-black/50 border border-red-800/30 rounded-lg text-white focus:border-red-500 focus:outline-none appearance-none pt-6"
                      >
                        <option value="video-editing">Video Editing</option>
                        <option value="photography">Photography</option>
                        <option value="youtube">YouTube Optimization</option>
                        <option value="full-package">Full Package</option>
                      </select>
                      <label
                        htmlFor="project-type"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4"
                      >
                        Project Type
                      </label>
                    </div>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-red-800/30 rounded-lg text-white placeholder-transparent focus:border-red-500 focus:outline-none resize-none peer pt-6"
                        placeholder="Tell me about your project..."
                      ></textarea>
                      <label
                        htmlFor="message"
                        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400"
                      >
                        Tell me about your project...
                      </label>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 glow-button">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-red-900/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-4 md:mb-0 glow-text">
              DAENIOR
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2024 Daenior. Crafting stories that captivate.
            </p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && lightbox.item && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLightbox({ open: false, item: null })}
                className="text-white hover:bg-red-900/50"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="max-w-4xl w-full">
              <div className="aspect-video relative bg-black/50 rounded-lg overflow-hidden">
                {lightbox.item.category === "photography" ? (
                  <Image
                    src={lightbox.item.image || "/placeholder.svg"}
                    alt={lightbox.item.title}
                    width={1200}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-red-500 mx-auto mb-4" />
                      <p className="text-white">Video would play here</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 text-white">
                <h3 className="text-2xl font-bold">{lightbox.item.title}</h3>
                <p className="text-gray-300 mt-2">{lightbox.item.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
