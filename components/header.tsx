"use client"

import { Menu, X, LogOut, LogIn } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    setUser(null)
    window.location.href = '/login'
  }

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
          <Link href="/beta-outreach" className="opt-header-nav-link">Beta Outreach</Link>
        </nav>

        <div className="opt-header-actions">
          {!loading && (
            user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            )
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
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">About</Link>
            <Link href="/research" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">Research</Link>
            <Link href="/beta-outreach" onClick={() => setMobileMenuOpen(false)} className="opt-header-nav-link">Beta Outreach</Link>
          </nav>
          <div className="opt-header-mobile-actions">
            {user ? (
              <>
                <button onClick={() => { setMobileMenuOpen(false); handleLogout() }} className="opt-btn-ghost" style={{ justifyContent: "center", width: "100%", cursor: "pointer", background: "none", border: "1px solid rgba(10,10,10,0.15)" }}>
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
