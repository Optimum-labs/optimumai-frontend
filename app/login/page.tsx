"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Redirect to dashboard if already logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace('/dashboard')
      } else {
        setCheckingAuth(false)
      }
    })
  }, [])

  useEffect(() => {
    // Check for verification success
    if (searchParams.get('verified') === 'true') {
      setSuccessMessage('Email verified successfully! You can now sign in.')
    }
  }, [searchParams])

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

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
      } else {
        // Redirect to dashboard on success
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
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

              <h1 className="auth-title">Welcome back</h1>
              <p className="auth-desc">Sign in to your OptimumAI account</p>

              <div className="auth-social">
                <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('github')}>
                  <Github size={14} /> GitHub
                </button>
                <button type="button" className="auth-social-btn" onClick={() => handleSocialLogin('google')}>
                  <Mail size={14} /> Google
                </button>
              </div>

              <div className="auth-divider"><span>Or continue with</span></div>

              {successMessage && (
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(184,150,90,0.1)",
                  border: "1px solid rgba(184,150,90,0.2)",
                  borderRadius: "4px",
                  marginBottom: "20px"
                }}>
                  <p style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "12px",
                    color: "var(--gold)",
                    margin: "0"
                  }}>
                    {successMessage}
                  </p>
                </div>
              )}

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
                  <label htmlFor="email" className="auth-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="auth-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="password" className="auth-label">Password</label>
                    <Link href="/forgot-password">Forgot password?</Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="auth-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="opt-btn-primary"
                  disabled={isLoading}
                  style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.6 : 1 }}
                >
                  {isLoading ? "Signing in…" : "Sign In"}
                </button>
              </form>

              <div className="auth-footer">
                <span>Don&apos;t have an account? </span>
                <Link href="/signup">Sign up</Link>
              </div>
            </div>

            <p className="auth-legal">
              By signing in, you agree to our{" "}
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="auth-page">
            <div>
              <div className="auth-card">
                <div className="auth-logo">O</div>
                <h1 className="auth-title">Loading...</h1>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <LoginForm />
    </Suspense>
  )
}
