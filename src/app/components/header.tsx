"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { link } from "fs"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true 
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const getLinkClasses = (path: string) => {
    const baseClasses = "transition-colors"
    const activeClasses = "text-blue-600 font-semibold"
    const inactiveClasses = "text-gray-700 hover:text-blue-600"
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`
  }

  const links = {
    home: '/',
    contact: '/site/contact',
    about: '/site/about',
    courses: '/site/courses'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-[200px] h-[50px] sm:w-[300px] sm:h-[75px]">
              <Image
                src="/imgs/unifamec_banner.webp"
                alt="UniFamec Banner"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href={links.home} className={getLinkClasses(links.home)}>
              Início
            </Link>
            <Link href={links.courses} className={getLinkClasses(links.courses)}>
              Cursos
            </Link>
            <Link href={links.about} className={getLinkClasses(links.about)}>
              Sobre Nós
            </Link>
            <Link href={links.contact} className={getLinkClasses(links.contact)}>
              Contato
            </Link>
            <Link
              href="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin
            </Link>
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={getLinkClasses("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/site/about"
                className={getLinkClasses("/site/courses")}
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link
                href="/site/about"
                className={getLinkClasses("/site/about")}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link
                href="/site/contact"
                className={getLinkClasses("/site/contact")}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Link
                href="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
