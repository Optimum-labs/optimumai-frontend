"use client"

import { Menu, X, LogOut, LogIn, LayoutDashboard, ChevronDown, Target, Users, Briefcase, Mail, BookOpen } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

const companyLinks = [
  { href: "/about", icon: BookOpen, label: "About Us", desc: "Our story and mission" },
  { href: "/about#mission", icon: Target, label: "Mission & Vision", desc: "Understanding consciousness" },
  { href: "/team", icon: Users, label: "Team", desc: "The people building OptimumAI" },
  { href: "/internships", icon: Briefcase, label: "Careers", desc: "Join the team" },
  { href: "/contact", icon: Mail, label: "Contact", desc: "Get in touch" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [ready, setReady] = useState(false)
  const companyRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompanyOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const handleLogout = async () => {
    setUser(null)
    await supabase.auth.signOut()
    await fetch('/api/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <header className="opt-header">
      <div className="opt-header-inner">
        <Link href="/" className="opt-header-logo">
          <div className="opt-header-logo-mark">O</div>
          <span className="opt-header-logo-text">OptimumAI</span>
        </Link>

        <nav className="opt-header-nav">
          {/* Company dropdown */}
          <div ref={companyRef} style={{ position: "relative" }}>
            <button
              className="opt-header-nav-link opt-header-nav-btn"
              onClick={() => setCompanyOpen((v) => !v)}
              aria-expanded={companyOpen}
            >
              Company
              <ChevronDown
                size={11}
                style={{
                  marginLeft: "4px",
                  transition: "transform 0.22s ease",
                  transform: companyOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {companyOpen && (
              <div className="opt-dropdown">
                <div className="opt-dropdown-header">OptimumAI</div>
                {companyLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="opt-dropdown-item"
                    onClick={() => setCompanyOpen(false)}
                  >
                    <item.icon size={14} className="opt-dropdown-icon" />
                    <div>
                      <div className="opt-dropdown-label">{item.label}</div>
                      <div className="opt-dropdown-desc">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/research" className="opt-header-nav-link">Research</Link>
          <Link href="/beta-outreach" className="opt-header-nav-link">Beta Outreach</Link>
        </nav>

        <div className="opt-header-actions" style={{ opacity: ready ? 1 : 0, transition: "opacity 0.15s ease" }}>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link href="/dashboard" className="opt-btn-ghost opt-header-started" style={{ padding: "8px 16px", fontSize: "11px" }}>
                <LayoutDashboard size={13} style={{ marginRight: "4px" }} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="opt-btn-ghost opt-header-started" style={{ padding: "8px 16px", fontSize: "11px", cursor: "pointer", background: "none", border: "1px solid rgba(10,10,10,0.15)" }}>
                <LogOut size={13} style={{ marginRight: "4px" }} /> Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link href="/login" className="opt-btn-ghost opt-header-started" style={{ padding: "8px 16px", fontSize: "11px" }}>
                <LogIn size={13} style={{ marginRight: "4px" }} /> Sign In
              </Link>
              <Link href="/contact" className="opt-btn-primary opt-header-started">Contact Us</Link>
            </div>
          )}
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
            {/* Company accordion on mobile */}
            <div>
              <button
                className="opt-header-nav-link opt-header-nav-btn"
                onClick={() => setMobileCompanyOpen((v) => !v)}
                style={{ width: "100%", justifyContent: "space-between" }}
              >
                Company
                <ChevronDown size={12} style={{ transform: mobileCompanyOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {mobileCompanyOpen && (
                <div style={{ paddingLeft: "16px", paddingTop: "8px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {companyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => { setMobileMenuOpen(false); setMobileCompanyOpen(false) }}
                      className="opt-header-nav-link"
                      style={{ fontSize: "11px" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/research" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">Research</Link>
            <Link href="/beta-outreach" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">Beta Outreach</Link>
          </nav>
          <div className="opt-header-mobile-actions">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="opt-btn-primary" style={{ justifyContent: "center", width: "100%" }}>
                  <LayoutDashboard size={13} style={{ marginRight: "6px" }} /> Dashboard
                </Link>
                <button onClick={() => { setMobileMenuOpen(false); handleLogout() }} className="opt-btn-ghost" style={{ justifyContent: "center", width: "100%", cursor: "pointer", background: "none", border: "1px solid rgba(10,10,10,0.15)", marginTop: "8px" }}>
                  <LogOut size={13} style={{ marginRight: "6px" }} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="opt-btn-ghost" style={{ justifyContent: "center" }}>Sign In</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="opt-btn-primary" style={{ justifyContent: "center", marginTop: "8px" }}>Contact Us</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
