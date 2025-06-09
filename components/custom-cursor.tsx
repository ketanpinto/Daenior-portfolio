"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .portfolio-card").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => removeEventListeners()
  }, [])

  // Hide cursor on mobile/touch devices
  if (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ) {
    return null
  }

  return (
    <>
      <motion.div
        className="custom-cursor-ring fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-red-500 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
          borderColor: linkHovered ? "#ffffff" : "#ef4444",
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 200,
          damping: 20,
        }}
      />
      <motion.div
        className="custom-cursor-dot fixed top-0 left-0 w-3 h-3 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: hidden ? 0 : 1,
          backgroundColor: linkHovered ? "#ffffff" : "#ef4444",
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 250,
          damping: 15,
        }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, .portfolio-card {
          cursor: none;
        }
      `}</style>
    </>
  )
}
