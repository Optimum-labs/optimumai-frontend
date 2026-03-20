"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, FlaskConical, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function ResearchLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError(authError.message)
      } else {
        router.push("/research/dashboard")
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page" style={{ maxWidth: "480px", paddingTop: "80px", paddingBottom: "80px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "36px", height: "36px", background: "var(--opt-red)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FlaskConical size={16} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)" }}>OptimumAI</div>
              <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>Research Portal</div>
            </div>
          </div>

          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "32px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: "8px" }}>
            Welcome back,<br /><em>Researcher</em>
          </h1>
          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", color: "var(--muted-txt)", lineHeight: 1.7, marginBottom: "36px" }}>
            Sign in to access your publications, assessment results, and LLM comparison dashboard.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@institution.edu"
                style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                  style={{ width: "100%", padding: "12px 14px", paddingRight: "42px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-txt)", display: "flex" }}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "#dc2626" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link href="/forgot-password" style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", textDecoration: "underline" }}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="opt-btn-primary" style={{ justifyContent: "center", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Signing in…" : <>Sign In <ArrowRight size={13} /></>}
            </button>
          </form>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(10,10,10,0.08)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)" }}>
              New to the Research Portal?{" "}
              <Link href="/research/signup" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "underline" }}>Create account</Link>
            </p>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginTop: "8px" }}>
              <Link href="/research" style={{ color: "var(--muted-txt)" }}>← Back to Research Hub</Link>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
