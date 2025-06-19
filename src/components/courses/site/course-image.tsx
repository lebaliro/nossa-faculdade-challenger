"use client"

import Image from "next/image"
import { useState } from "react"

interface CourseImageProps {
  src: string | null
  alt: string
  className?: string
}

export function CourseImage({ src, alt, className }: CourseImageProps) {
  const [imageError, setImageError] = useState(false)

  const imageSrc = imageError || !src ? "/placeholder.svg?height=300&width=400&text=Curso" : src

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      fill
      className={className}
      onError={() => setImageError(true)}
      priority={false}
    />
  )
}
