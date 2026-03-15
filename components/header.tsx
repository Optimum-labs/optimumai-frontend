"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="opt-header">
      <div className="opt-header-inner">
        <Link href="/" className="opt-header-logo">
          <div className="opt-header-logo-mark">O</div>
          <span className="opt-header-logo-text">OptimumAI</span>
        </Link>

        <nav className="opt-header-nav">
          <Link href="/about" className="opt-header-nav-link">About</Link>
          <Link href="/research" className="opt-header-nav-link">Research</Link>
        </nav>

        <div className="opt-header-actions">
          <Link href="/contact" className="opt-btn-primary opt-header-started">Contact Us</Link>
        </div>

        <button
          className="opt-header-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="opt-header-mobile-menu">
          <nav>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">About</Link>
            <Link href="/research" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">Research</Link>
          </nav>
          <div className="opt-header-mobile-actions">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="opt-btn-primary" style={{ justifyContent: "center" }}>Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  )
}
