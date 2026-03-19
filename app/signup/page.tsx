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
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />

        {checkingAuth ? (
          <div className="auth-page">
            <div>
              <div className="auth-card">
                <div className="auth-logo">O</div>
                <h1 className="auth-title">Loading...</h1>
              </div>
            </div>
          </div>
        ) : (
        <div className="auth-page">
          <div>
            <div className="auth-card">
              <div className="auth-logo">O</div>

              {isSuccess ? (
                <>
                  <h1 className="auth-title">Account Created!</h1>
                  <p className="auth-desc">Welcome to OptimumAI, {formData.name.split(' ')[0]}!</p>

                  <div style={{
                    padding: "24px",
                    background: "rgba(184,150,90,0.1)",
                    border: "1px solid rgba(184,150,90,0.2)",
                    borderRadius: "4px",
                    marginBottom: "24px",
                    textAlign: "center"
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      fontSize: "20px",
                      color: "var(--ink)"
                    }}>
                      ✓
                    </div>
                    <p style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "14px",
                      color: "var(--muted-txt)",
                      margin: "0"
                    }}>
                      Your account has been created successfully.<br />
                      Redirecting you to your dashboard...
                    </p>
                  </div>

                  <Link href="/dashboard" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="auth-title">Create an account</h1>
                  <p className="auth-desc">Start your AI learning journey with OptimumAI</p>

                  <div className="auth-social">
                    <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('github')}>
                      <Github size={14} /> GitHub
                    </button>
                    <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('google')}>
                      <Mail size={14} /> Google
                    </button>
                  </div>

                  <div className="auth-divider"><span>Or continue with</span></div>

                  {error && (
                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(200,57,43,0.1)",
                      border: "1px solid rgba(200,57,43,0.2)",
                      borderRadius: "4px",
                      marginBottom: "20px"
                    }}>
                      <p style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "12px",
                        color: "var(--opt-red)",
                        margin: "0"
                      }}>
                        {error}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                      <label htmlFor="name" className="auth-label">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        className="auth-input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="email" className="auth-label">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="auth-input"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="password" className="auth-label">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="auth-input"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="auth-input"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        autoComplete="new-password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="opt-btn-primary"
                      disabled={isLoading}
                      style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.6 : 1 }}
                    >
                      {isLoading ? "Creating account…" : "Create Account"}
                    </button>
                  </form>

                  <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link href="/login">Sign in</Link>
                  </div>
                </>
              )}
            </div>

            <p className="auth-legal">
              By signing up, you agree to our{" "}
              <Link href="/terms">Terms of Service</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
        )}
      </main>
      <Footer />
    </>
  )
}
