"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

function ResetPasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Supabase handles the token exchange automatically via the URL hash
    // We just need to check if there's an active session after redirect
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsValidToken(true)
      } else {
        // Listen for auth state change (token exchange happens async)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
          if (event === 'PASSWORD_RECOVERY') {
            setIsValidToken(true)
          }
        })
        // Give it a moment, then check again
        setTimeout(async () => {
          const { data: { session: s } } = await supabase.auth.getSession()
          if (s) {
            setIsValidToken(true)
          } else {
            setIsValidToken(false)
          }
        }, 2000)
        return () => subscription.unsubscribe()
      }
    }
    checkSession()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
        setTimeout(() => router.push('/login'), 3000)
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Still checking token validity
  if (isValidToken === null) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="auth-page">
            <div>
              <div className="auth-card">
                <div className="auth-logo">O</div>
                <h1 className="auth-title">Verifying…</h1>
                <p className="auth-desc">Please wait while we verify your reset link.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Invalid or expired token
  if (isValidToken === false) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="auth-page">
            <div>
              <div className="auth-card">
                <div className="auth-logo">O</div>
                <h1 className="auth-title">Invalid or expired link</h1>
                <p className="auth-desc">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <Link href="/forgot-password" className="opt-btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                    Request New Link
                  </Link>
                  <Link href="/login" className="opt-btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />

        <div className="auth-page">
          <div>
            <div className="auth-card">
              <div className="auth-logo">O</div>

              {isSuccess ? (
                <>
                  <h1 className="auth-title">Password updated!</h1>
                  <p className="auth-desc">
                    Your password has been successfully reset. Redirecting to sign in…
                  </p>

                  <div style={{
                    padding: "24px",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
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
                      You can now sign in with your new password.
                    </p>
                  </div>

                  <Link href="/login" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Go to Sign In
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="auth-title">Set new password</h1>
                  <p className="auth-desc">Enter your new password below.</p>

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
                      <label htmlFor="password" className="auth-label">New Password</label>
                      <input
                        id="password"
                        type="password"
                        className="auth-input"
                        placeholder="Enter new password (min 8 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </div>

                    <div className="auth-field">
                      <label htmlFor="confirmPassword" className="auth-label">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="auth-input"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        minLength={8}
                      />
                    </div>

                    <button
                      type="submit"
                      className="opt-btn-primary"
                      disabled={isLoading}
                      style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.6 : 1 }}
                    >
                      {isLoading ? "Updating…" : "Update Password"}
                    </button>
                  </form>

                  <div className="auth-footer">
                    <Link href="/login">Back to Sign In</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ResetPasswordPage() {
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
                <h1 className="auth-title">Loading…</h1>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
