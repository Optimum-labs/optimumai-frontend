"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Redirect to dashboard if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace('/dashboard')
      } else {
        setCheckingAuth(false)
      }
    })
  }, [])

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) {
        setError(error.message)
      }
    } catch {
      setError('Failed to sign in with ' + provider)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      } else {
        setIsSuccess(true)
        // Redirect to dashboard immediately — email verification is handled server-side
        router.push('/dashboard')
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setIsSuccess(false)
    setError(null)
  }

  return (
    <>
      <Header />
      <main className="optimum-main" style={{ paddingTop: 0 }}>
        <div className="grain-overlay" aria-hidden="true" />

        {checkingAuth ? (
          <div className="auth-page">
            <div className="auth-card" style={{ textAlign: "center" }}>
              <div className="auth-logo">O</div>
              <h1 className="auth-title">Loading…</h1>
            </div>
          </div>
        ) : (
        <div className="auth-split" style={{ minHeight: "100vh" }}>
          {/* ── Brand panel ── */}
          <div className="auth-split-brand">
            <div className="auth-split-brand-logo">
              <div className="auth-split-brand-mark">O</div>
              <span className="auth-split-brand-name">OptimumAI</span>
            </div>

            <div className="auth-split-brand-content">
              <h2 className="auth-split-brand-headline">
                Build the future of <em>AI research</em> with us.
              </h2>
              <p className="auth-split-brand-desc">
                Join 10,000+ researchers, builders, and learners pushing the frontier of human-centered AI.
                Get access to bootcamps, internships, and real research projects.
              </p>
            </div>

            <div className="auth-split-brand-trust">
              <div className="auth-split-trust-item">
                <div className="auth-split-trust-dot" />
                Free to join — no credit card required
              </div>
              <div className="auth-split-trust-item">
                <div className="auth-split-trust-dot" style={{ background: "var(--opt-red)" }} />
                Access live AI challenges &amp; competitions
              </div>
              <div className="auth-split-trust-item">
                <div className="auth-split-trust-dot" style={{ background: "rgba(245,240,232,0.4)" }} />
                Co-author papers from day one
              </div>
            </div>
          </div>

          {/* ── Form panel ── */}
          <div className="auth-split-form">
            <div className="auth-split-form-inner">
              {isSuccess ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "2px solid rgba(16,185,129,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: 24
                  }}>✓</div>
                  <h1 className="auth-title">You&apos;re in!</h1>
                  <p className="auth-desc">Welcome to OptimumAI, {formData.name.split(" ")[0]}. Redirecting to your dashboard…</p>
                  <Link href="/dashboard" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <h1 className="auth-title" style={{ textAlign: "left", marginBottom: "6px" }}>Create an account</h1>
                  <p className="auth-desc" style={{ textAlign: "left", marginBottom: "28px" }}>Start your AI journey with OptimumAI</p>

                  <div className="auth-social">
                    <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('github')}>
                      <Github size={15} /> GitHub
                    </button>
                    <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('google')}>
                      <Mail size={15} /> Google
                    </button>
                  </div>

                  <div className="auth-divider"><span>or continue with email</span></div>

                  {error && (
                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(200,57,43,0.07)",
                      border: "1px solid rgba(200,57,43,0.2)",
                      borderRadius: "8px",
                      marginBottom: "16px"
                    }}>
                      <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", color: "var(--opt-red)", margin: 0 }}>
                        {error}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                      <label htmlFor="name" className="auth-label">Full Name</label>
                      <input id="name" type="text" className="auth-input" placeholder="Your full name"
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required autoComplete="name" />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="email" className="auth-label">Email</label>
                      <input id="email" type="email" className="auth-input" placeholder="name@example.com"
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required autoComplete="email" />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="password" className="auth-label">Password</label>
                      <input id="password" type="password" className="auth-input" placeholder="Min 8 characters"
                        value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required autoComplete="new-password" />
                      {formData.password.length > 0 && (
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          {[1,2,3,4].map(i => (
                            <div key={i} style={{
                              flex: 1, height: 3, borderRadius: 2,
                              background: formData.password.length >= i * 3
                                ? i <= 1 ? "var(--opt-red)" : i <= 2 ? "#f59e0b" : i <= 3 ? "#3b82f6" : "var(--gold)"
                                : "rgba(10,10,10,0.1)",
                              transition: "background 0.3s"
                            }} />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="auth-field">
                      <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                      <input id="confirmPassword" type="password" className="auth-input" placeholder="Re-enter your password"
                        value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required autoComplete="new-password" />
                    </div>

                    <button type="submit" className="opt-btn-primary" disabled={isLoading}
                      style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.6 : 1, marginTop: "4px" }}>
                      {isLoading ? "Creating account…" : "Create Account"}
                    </button>
                  </form>

                  <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link href="/login">Sign in</Link>
                  </div>

                  <p className="auth-legal">
                    By signing up, you agree to our{" "}
                    <Link href="/terms">Terms of Service</Link> and{" "}
                    <Link href="/privacy">Privacy Policy</Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        )}
      </main>
    </>
  )
}
