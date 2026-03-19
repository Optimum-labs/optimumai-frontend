"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { createClient } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setIsSuccess(true)
      }
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
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
                  <h1 className="auth-title">Check your email</h1>
                  <p className="auth-desc">
                    We&apos;ve sent a password reset link to <strong>{email}</strong>
                  </p>

                  <div style={{
                    padding: "24px",
                    background: "rgba(184,150,90,0.1)",
                    border: "1px solid rgba(184,150,90,0.2)",
                    borderRadius: "4px",
                    marginBottom: "24px",
                    textAlign: "center"
                  }}>
                    <p style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "12px",
                      color: "var(--muted-txt)",
                      margin: "0"
                    }}>
                      Click the link in your email to reset your password. If you don&apos;t see
                      the email, check your spam folder.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <Link href="/login" className="opt-btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                      Back to Sign In
                    </Link>
                    <button
                      onClick={() => { setIsSuccess(false); setEmail("") }}
                      className="opt-btn-ghost"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Try another email
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="auth-title">Reset your password</h1>
                  <p className="auth-desc">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </p>

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

                    <button
                      type="submit"
                      className="opt-btn-primary"
                      disabled={isLoading}
                      style={{ width: "100%", justifyContent: "center", opacity: isLoading ? 0.6 : 1 }}
                    >
                      {isLoading ? "Sending…" : "Send Reset Link"}
                    </button>
                  </form>

                  <div className="auth-footer">
                    <span>Remember your password? </span>
                    <Link href="/login">Sign in</Link>
                  </div>
                </>
              )}
            </div>

            <p className="auth-legal">
              Need help? Contact us at{" "}
              <a href="mailto:support@optimumai.in">support@optimumai.in</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
