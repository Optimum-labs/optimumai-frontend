"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Added Link to home page */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <span className="text-primary-foreground font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold">OptimumAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/bootcamps" className="text-sm font-medium hover:text-accent transition-colors">
              Bootcamps
            </Link>
            <Link href="/research" className="text-sm font-medium hover:text-accent transition-colors">
              Research
            </Link>
            <Link href="/internships" className="text-sm font-medium hover:text-accent transition-colors">
              Internships
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                href="/bootcamps"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Bootcamps
              </Link>
              <Link
                href="/research"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Research
              </Link>
              <Link
                href="/internships"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Internships
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
